function UploadExcelTemplate({ handleExcelFileChange }) {
	return (
		<div className="card">
			<div className="card-header">
				<b>3. Upload Excel File</b>
			</div>
			<div className="card-body">
				<input
					type="file"
					id="excel_file"
					onChange={handleExcelFileChange}
				/>
			</div>
		</div>
	);
}
export default UploadExcelTemplate;
