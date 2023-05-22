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
import SwalLoader from "../components/SwalLoader";
import { useNavigate } from "react-router-dom";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = import.meta.env.VITE_BLOCKCHAIN_CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, FireGuys.abi, signer);

function CreateBatch() {
	const navigate = useNavigate();
	// const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
	const imageURI = `img/0.jpg`;
	useEffect(() => {
		getCount();
	}, []);

	const [isLoaderVisible, setIsLoaderVisible] = useState(false);

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
			const tokenId = Number(currentTotalMinted) + Number(i);
			const metadataURI = `${contentId}/${tokenId}.json`;
			metadataURIs.push(metadataURI);
			console.log(tokenId);
			tokenIds.push(tokenId);
		}
		const result = await contract.batchMintAcademicDocuments(
			addresses,
			metadataURIs,
			batchAcademicValues
		);
		const txReceipt = await result.wait();

		const count = await contract.count();
		setTotalMinted(parseInt(count));

		// minted values
		console.log("===========MINTEd VALUES===========");
		for (let i = 0; i < tokenIds.length; i++) {
			const tokenId = tokenIds[i];
			const mintedValue = await contract.getMintedValue(tokenId);
			console.log(mintedValue);
		}

		return { tokenIds, txReceipt };
	};

	// firebase actions
	const [batchInfo, setBatchInfo] = useState({
		batchName: "",
		templateType: "Diploma",
	});
	const [templateSheetData, setTemplateSheetData] = useState({});
	const templates = {
		Diploma: {
			excelTemplate: "/templates/DIPLOMA_CVSU.xlsx",
			bgTemplate: "DIPLOMA_CVSU.jpg",
		},
		"Certificate Of Grades": {
			excelTemplate: "/templates/COG_CVSU.xlsx",
			bgTemplate: "COG_CVSU.jpg",
		},
	};

	return (
		<div className="p-4 home">
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
				excelTemplatePath={
					templates[batchInfo.templateType]["excelTemplate"]
				}
			/>
			<UploadExcelTemplate setTemplateSheetData={setTemplateSheetData} />
			<ExcelTableOutput
				sheetData={templateSheetData}
				createBatchClick={createBatch}
			/>
			<SwalLoader
				isVisible={isLoaderVisible}
				loaderTitle="Proccessing Documents"
			/>
		</div>
	);

	async function createBatch() {
		setIsLoaderVisible(true);
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
			toMintAcademicValue["templateType"] = batchInfo["templateType"];
			toMintAcademicValue["bgTemplate"] =
				templates[batchInfo.templateType]["bgTemplate"];
			batchAcademicValues.push(JSON.stringify(toMintAcademicValue));
		}
		const { tokenIds, txReceipt } = await batchMintToken(
			batchAcademicValues
		);
		for (let i = 0; i < tokenIds.length; i++) {
			const tokenId = tokenIds[i];
			let isLast = false;
			if (i == tokenIds.length - 1) isLast = true;
			console.log(isLast);
			const currentAcademicValue = JSON.parse(batchAcademicValues[i]);
			await storeReceipt(
				batchKey,
				tokenId,
				currentAcademicValue["Certificate Printed Name"],
				currentAcademicValue["Certified Date"],
				JSON.stringify(txReceipt),
				isLast
			);
		}
		setIsLoaderVisible(false);
		navigate("/view-batch", { state: { batchId: batchKey } });
	}
}

export default CreateBatch;
