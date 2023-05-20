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
import Sidebar from "./components/Sidebar";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Sidebar />
		<div className="home">
			<Routes>
				<Route path="/" element={<Dashboard />}></Route>
				<Route path="/create-batch" element={<CreateBatch />}></Route>
			</Routes>
		</div>
	</BrowserRouter>
);
