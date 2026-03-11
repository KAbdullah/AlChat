import NavBar from "../components/NavBar";
import styles from "./HomePage.module.css";
import { Outlet, useLocation } from "react-router";

function HomePage() {
	const location = useLocation();
	return (
		<>
			<NavBar />
			<div className={styles.body}>
				{location.pathname === "/login" ? (
					<Outlet />
				) : (
					<>
						<h1 className={styles.chat}>Chat</h1>
						<div className={styles.hello}>Come chat here. </div>
					</>
				)}
			</div>
		</>
	);
}

export default HomePage;
