import { Outlet, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Sidebar() {
	const location = useLocation();
	const navigations = [
		{
			name: "Dashboard",
			icon: "bx bx-home-alt",
			link: "/",
		},
		{
			name: "Create Batch",
			icon: "bx bxs-file-plus",
			link: "/create-batch",
		},
	];
	return (
		<>
			<nav className="sidebar">
				<header>
					<div className="image-text">
						<span className="image">
							<img src="/img/logo1.png" alt="" />
						</span>

						<div className="text logo-text">
							<span className="name">Ryan Sargento</span>
							<span className="profession">Registrar</span>
						</div>
					</div>
				</header>

				<div className="menu-bar">
					<div className="menu">
						<li className="search-box">
							<i className="bx bx-search icon"></i>
							<input type="text" placeholder="Search..." />
						</li>

						<ul className="menu-links">
							{navigations.map((nav, rowIndex) => (
								<li className="nav-link" key={rowIndex}>
									<Link
										to={nav.link}
										className={
											location.pathname === nav.link
												? "active"
												: ""
										}
									>
										<i
											className={
												"bx bx-home-alt icon " +
												(location.pathname === nav.link
													? "active"
													: "") +
												" " +
												nav.icon
											}
										></i>
										<span
											className={
												"text nav-text " +
												(location.pathname === nav.link
													? "active"
													: "")
											}
										>
											{nav.name}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="bottom-content">
						<li className="">
							<a href="#">
								<i className="bx bx-log-out icon"></i>
								<span className="text nav-text">Logout</span>
							</a>
						</li>
					</div>
				</div>
			</nav>
			<Outlet />
		</>
	);
}

export default Sidebar;
