import { ethers } from "ethers";
import WalletBalance from "../components/WalletBalance";
import { useEffect, useState } from "react";
import FireGuys from "../../artifacts/contracts/MyNFT.sol/FiredGuys.json";
import NFTImage from "../components/NFTImage";
const contractAddress = "0x2A4769759D04c973ab712bB189db5499562B65F8";
import ExcelTableOutput from "../components/ExcelTableOutput";
import { read, utils } from "xlsx";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
import PageHeader from "../components/PageHeader";
import DownloadExcelTemplate from "../components/DownloadExcelTemplate";
import UploadExcelTemplate from "../components/UploadExcelTemplate";
const contract = new ethers.Contract(contractAddress, FireGuys.abi, signer);
import CreateBatchInfo from "../components/CreateBatchInfo";
function CreateBatch() {
	const [totalMinted, setTotalMinted] = useState(0);
	const [batchInfo, setBatchInfo] = useState({
		batchName: "",
		templateType: "Diploma",
	});
	const [templateSheetData, setTemplateSheetData] = useState(0);
	useEffect(() => {
		getCount();
	}, []);
	const getCount = async () => {
		const count = await contract.count();
		console.log(parseInt(count));
		setTotalMinted(parseInt(count));
	};

	// const templates = ["Diploma", "Certificate", "ID"];
	const templates = {
		Diploma: "/templates/DIPLOMA_CVSU.xlsx",
		"Certificate Of Grades": "/templates/COG_CVSU.xlsx",
	};

	const handleExcelFileChange = (event) => {
		const file = event.target.files[0];
		// Do something with the selected file
		var reader = new FileReader();
		reader.readAsArrayBuffer(event.target.files[0]);
		reader.onload = function (event) {
			var data = new Uint8Array(reader.result);
			var work_book = read(data, { type: "array" });
			var sheet_name = work_book.SheetNames;
			var sheet_data = utils.sheet_to_json(
				work_book.Sheets[sheet_name[0]],
				{ header: 1 }
			);
			setTemplateSheetData(sheet_data);
			console.log(sheet_data);
		};
	};

	return (
		<div className="p-4">
			{/* <WalletBalance />
				<h1>Fired Guys NFT COllection {totalMinted}</h1>
				<div className="grid grid-cols-5 gap-4 p-10">
					{Array(totalMinted + 1)
						.fill(0)
						.map((_, i) => (
							<div key={i} className="h-120 ">
								<NFTImage
									tokenId={i}
									getCount={getCount}
									contract={contract}
									signer={signer}
								/>
							</div>
						))}
				</div> */}
			<PageHeader pageName={"Create Batch"} />
			<CreateBatchInfo
				batchInfo={batchInfo}
				setBatchInfo={setBatchInfo}
				templates={templates}
			/>
			<DownloadExcelTemplate
				excelTemplatePath={templates[batchInfo.templateType]}
			/>
			<UploadExcelTemplate
				handleExcelFileChange={handleExcelFileChange}
			/>
			<ExcelTableOutput sheetData={templateSheetData} />
		</div>
	);
}

export default CreateBatch;
