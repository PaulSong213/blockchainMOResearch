import { read, utils } from "xlsx";

function UploadExcelTemplate({ setTemplateSheetData }) {
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
		<div className="card">
			<div className="card-header">
				<b>3. Upload Excel File</b>
			</div>
			<div className="card-body">
				<input
					accept=".xlsx, .xls"
					type="file"
					id="excel_file"
					onChange={handleExcelFileChange}
				/>
			</div>
		</div>
	);
}
export default UploadExcelTemplate;
