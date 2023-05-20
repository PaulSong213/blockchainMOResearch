import { ethers } from "ethers";
import WalletBalance from "../components/WalletBalance";
import { useEffect, useState } from "react";
import FireGuys from "../../artifacts/contracts/MyNFT.sol/FiredGuys.json";
import NFTImage from "../components/NFTImage";
import ExcelTableOutput from "../components/ExcelTableOutput";
import { read, utils } from "xlsx";
import PageHeader from "../components/PageHeader";
import DownloadExcelTemplate from "../components/DownloadExcelTemplate";
import UploadExcelTemplate from "../components/UploadExcelTemplate";
import CreateBatchInfo from "../components/CreateBatchInfo";
import { firebaseCreateBatch } from "../firebase_setup/globals";
import { storeReceipt } from "../firebase_setup/globals";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const contract = new ethers.Contract(contractAddress, FireGuys.abi, signer);
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
		setTotalMinted(parseInt(count));
		return count;
	};

	const batchMintToken = async (batchAcademicValues) => {
		const currentTotalMinted = await getCount();
		const contentId = "QmRYiKnb8xxn1vrPRThuAnkTkGfokqHg4hXB1YR19ifbZw";
		const connection = contract.connect(signer);
		const addr = connection.address;
		let addresses = [];
		let metadataURIs = [];
		let tokenIds = [];
		for (let i = 0; i < batchAcademicValues.length; i++) {
			addresses.push(addr);
			// metadataURI
			const tokenId = Number(currentTotalMinted) + Number(i) + 1;
			const metadataURI = `${contentId}/${tokenId}.json`;
			tokenIds.push(tokenId);
			metadataURIs.push(metadataURI);
			console.log(tokenId);
		}
		const result = await contract.batchMintAcademicDocuments(
			addresses,
			metadataURIs,
			batchAcademicValues
		);
		const txReceipt = await result.wait();
		console.log(txReceipt);
		const count = await contract.count();
		setTotalMinted(parseInt(count));
		console.log("Total Minted: ", parseInt(count));
		return { tokenIds, txReceipt };
	};

	// firebase actions
	const [batchInfo, setBatchInfo] = useState({
		batchName: "Batch 2020-2021",
		templateType: "Diploma",
	});
	const [templateSheetData, setTemplateSheetData] = useState({});
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
		const batchKey = await firebaseCreateBatch(batchInfo);
		const academicValues = templateSheetData;
		const keys = academicValues[0];
		const batchAcademicValues = [];
		for (let i = 1; i < academicValues.length; i++) {
			const currentRow = academicValues[i];
			let toMintAcademicValue = {};
			for (let k = 0; k < keys.length; k++) {
				const key = keys[k];
				toMintAcademicValue[key] = currentRow[k];
			}
			console.log(toMintAcademicValue);
			batchAcademicValues.push(toMintAcademicValue);
		}
		const { tokenIds, txReceipt } = await batchMintToken(
			batchAcademicValues
		);
		for (let i = 0; i < tokenIds.length; i++) {
			const tokenId = tokenIds[i];
			let isLast = false;
			if (i == tokenIds.length - 1) isLast = true;
			console.log(isLast);
			await storeReceipt(
				batchKey,
				tokenId,
				batchAcademicValues[i]["Certificate Printed Name"],
				batchAcademicValues[i]["Certified Date"],
				JSON.stringify(txReceipt),
				isLast
			);
		}

		// TODO: Close loader here
	}
}

export default CreateBatch;
