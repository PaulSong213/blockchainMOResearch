import { ethers } from "ethers";
import FireGuys from "../../artifacts/contracts/MyNFT.sol/FiredGuys.json";
import { useEffect, useState, createRef } from "react";
import QRCode from "qrcode";
import PageHeader from "../components/PageHeader";
import {
	Page,
	Text,
	Document,
	PDFViewer,
	Font,
	Image,
	PDFDownloadLink,
} from "@react-pdf/renderer";

import { useLocation, useNavigate } from "react-router-dom";
import SwalLoader from "../components/SwalLoader";

function VerifyTemplate() {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	const contractAddress = import.meta.env.VITE_BLOCKCHAIN_CONTRACT_ADDRESS;
	const contract = new ethers.Contract(contractAddress, FireGuys.abi, signer);
	const [mintedValue, setMintedValue] = useState({});
	const [transactionDetails, setTransactionDetails] = useState({});

	const verifyStatusGuide = {
		verifying: "verifying",
		verified: "verified",
		invalid: "invalid",
	};
	const [verifyStatus, setVerifyStatus] = useState(
		verifyStatusGuide.verifying
	);

	const location = useLocation();
	const navigate = useNavigate();

	const getMintedValue = async () => {
		// get token id
		const searchParams = new URLSearchParams(location.search);
		const tokenId = searchParams.get("tokenId");
		const paramTransactionDetails = searchParams.get("transactionDetails");
		if (!tokenId || !paramTransactionDetails) {
			console.log("Invalid Credentials");
			setVerifyStatus(verifyStatusGuide.invalid);
			return;
		}
		// get minted value
		const res = await contract.getMintedValue(tokenId);
		if (!res) {
			console.log("Invalid Minted Value");
			setVerifyStatus(verifyStatusGuide.invalid);
			return;
		}
		setMintedValue(JSON.parse(res));

		console.log("Minted Value: ", JSON.parse(res));

		// set transaction details
		setTransactionDetails(JSON.parse(paramTransactionDetails));
		console.log(
			"Transaction Details: ",
			JSON.parse(paramTransactionDetails)
		);
		setVerifyStatus(verifyStatusGuide.verified);
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
		<div className="p-5 d-flex flex-column justify-content-center">
			<PageHeader
				pageName={"Cavite State University Academic Document Verifier"}
			/>
			<SwalLoader
				isVisible={verifyStatus === verifyStatusGuide.verifying}
				loaderTitle="Verifying Document"
			/>
			{verifyStatus === verifyStatusGuide.verified && (
				<div className="d-flex flex-column">
					<div className="d-flex justify-content-center my-5">
						<div
							className="card p-3 w-100"
							style={{
								backgroundColor: "#E6E6E6",
								fontWeight: "500",
								maxWidth: "1000px",
							}}
						>
							<span>Issuer: Cavite State University Bacoor</span>
							<span>
								Issuer Address: {transactionDetails.from}
							</span>
							<span>
								Document Hash:
								{transactionDetails.transactionHash}
							</span>
							<PDFDownloadLink
								className="btn mt-3 mx-auto px-3 btn-secondary"
								style={{
									width: "max-content",
								}}
								document={
									<TemplateDocument
										mintedValue={mintedValue}
									/>
								}
								fileName={
									mintedValue["Certificate Printed Name"]
								}
							>
								{({ blob, url, loading, error }) =>
									loading
										? "Loading document..."
										: "Download as PDF"
								}
							</PDFDownloadLink>
						</div>
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
			)}
			{verifyStatus === verifyStatusGuide.invalid && (
				<div className="alert alert-danger" role="alert">
					The document is not yet verified. Please contact the
					registar.
				</div>
			)}
		</div>
	);
}

function TemplateDocument({ mintedValue }) {
	const [qrCodeData, setQRCodeData] = useState("");

	// Generate the QR code data
	useEffect(() => {
		let url = window.location.href;
		console.log(url);
		QRCode.toDataURL(url)
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
