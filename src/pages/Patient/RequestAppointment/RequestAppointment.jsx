import { useEffect, useState } from "react";

function RequestAppointment() {
	let servicesOptions = [
		"X-Ray",
		"Drug Test",
		"Medical Certificate",
		"Pre Employment",
		"Immunization",
	];

	const [selectedServices, setSelectedServices] = useState([]);

	return (
		<div className="">
			<form className="p-5">
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						How can we help you?
					</label>
					<div id="emailHelp" className="form-text">
						Select one or more service you are looking for
					</div>
				</div>
				<div>
					{servicesOptions.map((service) => {
						return (
							<div className="mb-3">
								<div
									onClick={() => {
										if (
											selectedServices.includes(service)
										) {
											setSelectedServices(
												selectedServices.filter(
													(s) => s != service
												)
											);
										} else {
											setSelectedServices([
												...selectedServices,
												service,
											]);
										}
									}}
									className={
										"btn " +
										(selectedServices.includes(service)
											? "btn-primary"
											: "border")
									}
								>
									<h6 className="my-auto">{service}</h6>
								</div>
							</div>
						);
					})}
				</div>

				<button type="submit" className="btn btn-success">
					Submit
				</button>
			</form>
		</div>
	);
}

export default RequestAppointment;
