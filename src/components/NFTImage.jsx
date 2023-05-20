import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { storeReceipt } from "../firebase_setup/globals";
function NFTImage({ tokenId, getCount, contract, signer }) {
	const contentId = "QmRYiKnb8xxn1vrPRThuAnkTkGfokqHg4hXB1YR19ifbZw";
	const metadataURI = `${contentId}/${tokenId}.json`;
	// const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
	const imageURI = `img/0.jpg`;
	const [isMinted, setIsMinted] = useState(false);
	const [mintValue, setMintValue] = useState("");
	useEffect(() => {
		getMintedStatus();
		if (isMinted) getMintedValue();
	}, [isMinted]);

	const getMintedStatus = async () => {
		const result = await contract.isContentOwned(metadataURI);
		setIsMinted(result);
	};
	const getMintedValue = async () => {
		const mintedValue = await contract.getMintedValue(tokenId);
		setMintValue(mintedValue.toString());
	};

	const mintToken = async () => {
		const connection = contract.connect(signer);
		const addr = connection.address;
		const result = await contract.mintAcademicDocument(
			addr,
			metadataURI,
			"test",
			{
				value: ethers.utils.parseEther("0"),
			}
		);

		const receipt = await result.wait();
		console.log(receipt);
		storeReceipt(tokenId, JSON.stringify(receipt));
		getMintedStatus();
		getCount();
	};

	async function getURI() {
		const uri = await contract.tokenURI(tokenId);
		alert(uri);
	}
	return (
		<div className="p-3 rounded shadow-md h-100">
			<img
				className="border-2 border-grey-100 mx-auto"
				src={isMinted ? imageURI : "img/placeholder.png"}
			></img>
			<h5>ID #{tokenId}</h5>
			<h5>Value: {mintValue}</h5>
			{!isMinted ? (
				<button onClick={mintToken}>Mint</button>
			) : (
				<button onClick={getURI}>Taken! Show URI</button>
			)}
		</div>
	);
}

export default NFTImage;
