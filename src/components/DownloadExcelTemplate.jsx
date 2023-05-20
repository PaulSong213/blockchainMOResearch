function DownloadExcelTemplate({ excelTemplatePath }) {
	return (
		<div className="card mb-1">
			<div className="card-header">
				<b>2. Download Excel Template</b>
			</div>
			<div className="card-body">
				<a href={excelTemplatePath} className="btn btn-secondary">
					Download Excel Template
				</a>
			</div>
		</div>
	);
}

export default DownloadExcelTemplate;
