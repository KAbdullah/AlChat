import styles from "./NavBar.module.css";

function NavBar() {
	return (
		<nav>
			<a className={styles.logo} href="#">
				<img src="/images/AlChatLogo2.png" alt="Website Logo" />
			</a>

			<ul className={styles.navlist}>
				<li className={styles.about}>
					<a href="#loser">About Us</a>
				</li>
				<li className={styles.signup}>
					<a href="#winner">Sign Up</a>
				</li>
				<li className={styles.login}>
					<a href="#bum">Login</a>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
