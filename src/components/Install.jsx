const Install = () => {
	return (
		<header className="masthead">
			<div className="container px-5">
				<div className="row gx-5 align-items-center">
					<div className="col-lg-6">
						{/* Mashead text and app badges */}
						<div className="mb-5 mb-lg-0 text-center text-lg-start">
							<h3 className="display-3 lh-1 mb-3">
								CvSU Academic Document Blockchain Storage
							</h3>
							<p className="lead fw-normal text-muted mb-5">
								To use this system, you need to have Metamask
								installed in your browser.{" "}
								<span
									style={{
										color: "#E77A23",
										fontWeight: "600",
									}}
								>
									Metamask
								</span>{" "}
								is a digital wallet that allows you to interact
								with Ethereum blockchain applications.
							</p>
							<div className="d-flex flex-column flex-lg-row align-items-center">
								<a
									target="_blank"
									rel="noopener noreferrer"
									className="me-lg-3 fs-5 mb-4 mb-lg-0 btn btn-success"
									href="https://metamask.io/download/"
								>
									Download Metamask
								</a>
							</div>
						</div>
					</div>
					<div className="col-lg-6">
						{/* Masthead device mockup feature */}
						<div className="px-5">
							<img
								style={{ width: "100%" }}
								src="/img/logo.png"
								alt="CvSU logo"
							/>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Install;
