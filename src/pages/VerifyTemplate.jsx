import { ethers } from "ethers";
import FireGuys from "../../artifacts/contracts/MyNFT.sol/FiredGuys.json";
import { useEffect, useState, createRef } from "react";
import QRCode from "qrcode";

import {
	Page,
	Text,
	Document,
	PDFViewer,
	Font,
	Image,
	PDFDownloadLink,
} from "@react-pdf/renderer";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = import.meta.env.VITE_BLOCKCHAIN_CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, FireGuys.abi, signer);
import { useLocation, useNavigate } from "react-router-dom";

function VerifyTemplate() {
	const [mintedValue, setMintedValue] = useState({});

	const location = useLocation();
	const navigate = useNavigate();

	const getMintedValue = async () => {
		// get token id
		const searchParams = new URLSearchParams(location.search);
		const tokenId = searchParams.get("tokenId");
		if (!tokenId) return navigate("/");
		// get minted value
		const res = await contract.getMintedValue(tokenId);
		setMintedValue(JSON.parse(res));
		console.log(JSON.parse(res));
		return res;
	};

	useState(() => {
		getMintedValue();
	}, []);
	const ref = createRef();
	Font.register({
		family: "Roboto",
		fonts: [
			{
				src: "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9vAx05IsDqlA.ttf",
			},
			{
				src: "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf",
				fontWeight: "700",
			},
		],
	});
	return (
		<div className="p-3 bg-white">
			<div className="py-5 d-flex flex-column justify-content-center">
				<div>
					<PDFDownloadLink
						className="btn btn-primary mb-3"
						document={
							<TemplateDocument mintedValue={mintedValue} />
						}
						fileName={mintedValue["Certificate Printed Name"]}
					>
						{({ blob, url, loading, error }) =>
							loading ? "Loading document..." : "Download PDF"
						}
					</PDFDownloadLink>
				</div>
				<PDFViewer
					className="mx-auto"
					showToolbar={false}
					width="1000"
					height="700"
					style={{
						backgroundColor: "white",
					}}
				>
					<TemplateDocument mintedValue={mintedValue} />
				</PDFViewer>
			</div>
		</div>
	);
}

function TemplateDocument({ mintedValue }) {
	const [qrCodeData, setQRCodeData] = useState("");

	// Generate the QR code data
	useEffect(() => {
		QRCode.toDataURL("https://reactjs.org/")
			.then((dataURL) => {
				setQRCodeData(dataURL);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	return (
		<Document className="d-flex justify-content-center">
			<Page
				size={[633, 489]}
				style={{
					overflow: "hidden",
					position: "relative",
				}}
			>
				<Image
					src={`/templates/${mintedValue.bgTemplate}`}
					style={{
						height: "489px",
						width: "633px",
						overflow: "hidden",
					}}
				/>
				<Text
					style={{
						position: "absolute",
						top: "140px",
						height: "50px",
						width: "100%",
						fontFamily: "Roboto",
						textAlign: "center",
						fontSize: "36px",
					}}
				>
					{mintedValue["Certificate Printed Name"]}
				</Text>

				<Text
					style={{
						position: "absolute",
						top: "220px",
						height: "50px",
						width: "100%",
						paddingLeft: "15px",
						textAlign: "center",
						fontSize: "20px",
						fontWeight: "700",
					}}
				>
					{mintedValue["Course"]}
				</Text>
				<Text
					style={{
						position: "absolute",
						top: "328px",
						height: "50px",
						width: "100%",
						fontSize: "9px",
						textAlign: "center",
					}}
				>
					given this {mintedValue["Certified Date"]} at Bacoor, Cavite
				</Text>

				<Image
					style={{
						position: "absolute",
						left: "20px",
						bottom: "20px",
						width: "80px",
						height: "80px",
					}}
					src={qrCodeData}
				/>
			</Page>
		</Document>
	);
}
export default VerifyTemplate;
