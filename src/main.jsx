import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
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
ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Sidebar />
		<div>
			<Routes>
				{/* NOTE: if the page has sidebar add - className="home" */}
				<Route path="/" element={<Dashboard />}></Route>
				<Route path="/create-batch" element={<CreateBatch />}></Route>
				<Route path="/view-batch" element={<ViewBatch />}></Route>
				<Route
					path="/verify-credential"
					element={<VerifyTemplate />}
				></Route>
			</Routes>
		</div>
	</BrowserRouter>
);
