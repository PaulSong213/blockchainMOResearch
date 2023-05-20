function PageHeader({ pageName }) {
	return (
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

			<center className="my-auto">
				<h2>{pageName}</h2>
			</center>
		</div>
	);
}

export default PageHeader;
