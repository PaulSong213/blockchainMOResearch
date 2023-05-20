function ExcelTableOutput({ sheetData }) {
	return (
		<div>
			{sheetData.length > 0 && (
				<div className="mt-3 bg-white rounded card">
					<div className="card-header">
						<b>4. Create Batch</b>
					</div>
					<div className="card-body">
						<h5 className="mb-4">Total : {sheetData.length - 1}</h5>
						<table className="table table-striped table-bordered">
							<tbody>
								{sheetData.map((rowData, rowIndex) => (
									<tr key={rowIndex}>
										{rowData.map((cellData, cellIndex) =>
											rowIndex === 0 ? (
												<th
													style={{
														fontSize: "14px",
														marginLeft: "5px",
													}}
													key={cellIndex}
												>
													{cellData}
												</th>
											) : (
												<td
													style={{
														fontSize: "16px",
														marginLeft: "5px",
													}}
													key={cellIndex}
												>
													{cellData}
												</td>
											)
										)}
									</tr>
								))}
							</tbody>
						</table>
						<div className="d-flex justify-content-end">
							<button className="btn btn-primary mt-3">
								Create Batch
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ExcelTableOutput;
