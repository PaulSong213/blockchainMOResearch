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
import { firebaseCreateBatch } from "../firebase_setup/globals";
import { storeReceipt } from "../firebase_setup/globals";

function CreateBatch() {
	// const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
	const imageURI = `img/0.jpg`;
	useEffect(() => {
		getCount();
	}, []);

	// blockchain actions
	const [totalMinted, setTotalMinted] = useState(0);
	const getCount = async () => {
		const count = await contract.count();
		console.log(parseInt(count));
		setTotalMinted(parseInt(count));
	};

	const mintToken = async () => {
		const tokenId = totalMinted + 1;
		const contentId = "QmRYiKnb8xxn1vrPRThuAnkTkGfokqHg4hXB1YR19ifbZw";
		const metadataURI = `${contentId}/${tokenId}.json`;

		const connection = contract.connect(signer);
		const addr = connection.address;
		const result = await contract.payToMint(addr, metadataURI, "test", {
			value: ethers.utils.parseEther("0"),
		});
		const receipt = await result.wait();
		console.log(receipt);
		storeReceipt(tokenId, JSON.stringify(receipt));
		getMintedStatus();
		getCount();
	};

	// firebase actions
	const [batchInfo, setBatchInfo] = useState({
		batchName: "Batch 2020-2021",
		templateType: "Diploma",
	});
	const [templateSheetData, setTemplateSheetData] = useState(0);
	const templates = {
		Diploma: "/templates/DIPLOMA_CVSU.xlsx",
		"Certificate Of Grades": "/templates/COG_CVSU.xlsx",
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
			<UploadExcelTemplate setTemplateSheetData={setTemplateSheetData} />
			<ExcelTableOutput
				sheetData={templateSheetData}
				createBatchClick={createBatch}
			/>
		</div>
	);

	async function createBatch() {
		await mintToken();
		// console.log("1");
		// const batchKey = await firebaseCreateBatch(batchInfo);
		// console.log(batchKey);
		// const tx = await contract.createBatch(batchName, templateType, templateData);
		// await tx.wait();
		// console.log("Batch Created");
	}
}

export default CreateBatch;
