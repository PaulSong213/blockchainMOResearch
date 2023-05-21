import { useEffect, useState } from "react";

function SwalLoader({ loaderTitle, isVisible }) {
	if (!isVisible) {
		return null;
	}
	return (
		<div
			style={{
				position: "fixed",
				top: "0",
				width: "100vw",
				height: "100vh",
				left: "0",
				zIndex: 9999,
				backgroundColor: "rgba(255,255,255,0.7)",
			}}
		>
			<div className="position-relative w-100 h-100 d-flex justify-content-center flex-column">
				<h1 className="text-center mb-5 text-success">{loaderTitle}</h1>
				<div
					style={{ width: "100px", height: "100px" }}
					className="spinner-border text-success align-self-center mx-auto"
					role="status"
				>
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		</div>
	);
}

export default SwalLoader;
