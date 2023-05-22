import PageHeader from "../components/PageHeader";
import { firebaseGetBatch } from "../firebase_setup/globals.js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function ViewBatch() {
	const location = useLocation();
	const navigate = useNavigate();

	const [batchInfo, setBatchInfo] = useState({
		batchName: "Loading...",
		templateType: "Loading...",
		tokens: {},
	});

	const columns = [
		"Token ID",
		"Certified Printed Name",
		"Certified Date",
		"Action",
	];
	useEffect(() => {
		getBatch();
	}, []);

	const getBatch = async () => {
		if (!location.state) return;
		const { batchId } = location.state;
		const batches = await firebaseGetBatch(batchId);
		setBatchInfo(batches);
		return batches;
	};
	return (
		<div className="p-3 home">
			<PageHeader pageName={"View Batch"} />

			<div className="card">
				<div className="card-header d-flex justify-content-between">
					<b>Batch Name: {batchInfo.batchName}</b>
					<b>Type: {batchInfo.templateType}</b>
				</div>
				<div className="card-body">
					<table className="table table-striped">
						<thead>
							<tr>
								{columns.map((colData, rowIndex) => (
									<th key={rowIndex}>{colData}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{Object.keys(batchInfo.tokens).map(
								(tokenId, index) => (
									<tr key={tokenId}>
										<th scope="row">{tokenId}</th>
										<td>{batchInfo.tokens[tokenId].CPN}</td>
										<td>
											{
												batchInfo.tokens[tokenId]
													.certifiedDate
											}
										</td>
										<td>
											<button
												style={{ fontSize: "10px" }}
												className="btn btn-secondary"
												onClick={() => {
													let txReceipt = JSON.parse(
														batchInfo.tokens[
															tokenId
														].txReceipt
													);
													let verifyTxReceipt = {};

													verifyTxReceipt["from"] =
														txReceipt["from"];
													verifyTxReceipt[
														"blockHash"
													] = txReceipt["from"];

													window.open(
														`/verify-credential?tokenId=${tokenId}&transactionDetails=${JSON.stringify(
															verifyTxReceipt
														)}`,
														"_blank"
													);
												}}
											>
												Verify Credential
											</button>
										</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default ViewBatch;
