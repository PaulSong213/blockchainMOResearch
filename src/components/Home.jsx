import { ethers } from "ethers";
import WalletBalance from "./WalletBalance";
import { useEffect, useState } from "react";
import FireGuys from "../../artifacts/contracts/MyNFT.sol/FiredGuys.json";
import NFTImage from "./NFTImage";
const contractAddress = "0x2A4769759D04c973ab712bB189db5499562B65F8";
import Sidebar from "./Sidebar";
import ExcelTableOutput from "./ExcelTableOutput";
import { read, utils } from "xlsx";

function Home() {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();

	const contract = new ethers.Contract(contractAddress, FireGuys.abi, signer);
	const [totalMinted, setTotalMinted] = useState(0);
	const [templateSheetData, setTemplateSheetData] = useState(0);
	useEffect(() => {
		getCount();
	}, []);
	const getCount = async () => {
		const count = await contract.count();
		console.log(parseInt(count));
		setTotalMinted(parseInt(count));
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
		<div>
			<Sidebar />
			<div className="home p-4">
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
				<div className="container">
					<div
						className="card mb-3"
						style={{
							backgroundColor: "white",
							width: "100%",
							height: "90px",
						}}
					>
						<img
							src="/img/logo.png"
							style={{
								height: "80px",
								position: "absolute",
								paddingLeft: "10px",
								top: "5px",
							}}
						/>

						<center>
							<h2 style={{ paddingBottom: "10px" }}>
								<br />
								Cavite State University Student List
							</h2>
						</center>
					</div>
					<div className="card mb-1">
						<div className="card-header">
							<b>1. Download Excel Template</b>
						</div>
						<div className="card-body">
							<a
								href="/templates/DIPLOMA_CVSU.xlsx"
								className="btn btn-secondary"
							>
								Download Excel Template
							</a>
						</div>
					</div>
					<div className="card">
						<div className="card-header">
							<b>2. Upload Excel File</b>
						</div>
						<div className="card-body">
							<input
								type="file"
								id="excel_file"
								onChange={handleExcelFileChange}
							/>
						</div>
					</div>
					<ExcelTableOutput sheetData={templateSheetData} />
				</div>
			</div>
		</div>
	);
}

export default Home;
