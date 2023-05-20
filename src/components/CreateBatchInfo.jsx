function CreateBatchInfo({ batchInfo, setBatchInfo, templates }) {
	return (
		<div className="card mb-1">
			<div className="card-header">
				<b>1. Batch Information</b>
			</div>
			<div className="card-body row">
				<div className="col-12 col-md-6">
					<label htmlFor="basic-url">Batch Name</label>
					<div className="input-group mb-3">
						<input
							onChange={(e) => {
								setBatchInfo({
									...batchInfo,
									batchName: e.target.value,
								});
							}}
							value={batchInfo.batchName}
							type="text"
							className="form-control"
							id="basic-url"
							placeholder="Enter Batch Name"
							aria-describedby="basic-addon3"
						/>
					</div>
				</div>

				<div className="col-12 col-md-6">
					<label htmlFor="basic-url">Template Type</label>
					<div className="input-group mb-3">
						<button
							className="btn btn-outline-secondary dropdown-toggle"
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							{batchInfo.templateType}
						</button>
						<ul className="dropdown-menu">
							{Object.keys(templates).map((keyName, i) => (
								<li
									key={keyName}
									onClick={() => {
										setBatchInfo({
											...batchInfo,
											templateType: keyName,
										});
									}}
								>
									<span className="dropdown-item">
										{keyName}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
export default CreateBatchInfo;
