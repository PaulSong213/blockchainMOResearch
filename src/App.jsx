import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "boxicons";
import Dashboard from "./pages/Dashboard.jsx";
import CreateBatch from "./pages/CreateBatch.jsx";
import ViewBatch from "./pages/ViewBatch.jsx";
import Sidebar from "./components/Sidebar";
import VerifyTemplate from "./pages/VerifyTemplate";
import Install from "./components/Install";
import ListBatch from "./pages/ListBatch";
import PatientLogin from "./pages/PatientLogin";
import RequestAppointment from "./pages/Patient/RequestAppointment/RequestAppointment";
function App() {
	if (typeof window.ethereum !== "undefined") {
		console.log("Has metamask");
		return (
			<BrowserRouter>
				<Sidebar />
				<div>
					<Routes>
						{/* NOTE: if the page has sidebar add - className="home" */}
						<Route
							path="/patient-login"
							element={<PatientLogin />}
						></Route>
						<Route
							path="/patient-request-appointment"
							element={<RequestAppointment />}
						></Route>
						<Route path="/" element={<Dashboard />}></Route>
						<Route
							path="/create-batch"
							element={<CreateBatch />}
						></Route>
						<Route
							path="/view-batch"
							element={<ViewBatch />}
						></Route>
						<Route
							path="/list-batch"
							element={<ListBatch />}
						></Route>
						<Route
							path="/verify-credential"
							element={<VerifyTemplate />}
						></Route>
					</Routes>
				</div>
			</BrowserRouter>
		);
	} else {
		console.log("Please install metamask");
		return <Install />;
	}
}

export default App;
