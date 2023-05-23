import PageHeader from "../components/PageHeader";
import SwalLoader from "../components/SwalLoader";
import { firebaseGetAllBatch } from "../firebase_setup/globals.js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function ListBatch() {
	const navigate = useNavigate({});

	const [batchInfo, setBatchInfo] = useState({});

	const columns = ["Batch Name", "Template Type", "Action"];
	useEffect(() => {
		getBatch();
	}, []);

	const getBatch = async () => {
		const batches = await firebaseGetAllBatch();
		setBatchInfo(batches);
		return batches;
	};
	return (
		<div className="p-3 home">
			<SwalLoader
				loaderTitle="Getting Batches"
				isVisible={Object.keys(batchInfo).length === 0}
			/>
			<PageHeader pageName={"Batch List"} />

			<div className="card">
				<div className="card-header d-flex justify-content-between">
					<b>Batch List</b>
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
							{Object.keys(batchInfo).map((key, index) => (
								<tr key={index}>
									<td scope="row">
										{batchInfo[key].batchName}
									</td>
									<td scope="row">
										{batchInfo[key].templateType}
									</td>
									<td>
										<button
											style={{ fontSize: "10px" }}
											className="btn btn-success"
											onClick={() => {
												navigate("/view-batch", {
													state: { batchId: key },
												});
											}}
										>
											View Batcwh
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default ListBatch;
