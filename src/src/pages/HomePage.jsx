import NavBar from "../features/chat/components/NavBar";
import styles from "./HomePage.module.css";

function HomePage() {
	return (
		<>
			<NavBar />
			<div className={styles.body}>
				<h1 className={styles.chat}>Chat</h1>
				<div className={styles.hello}>Come chat here. </div>
			</div>
		</>
	);
}

export default HomePage;
