import { useState } from "react";
import styles from "./LoginPage.module.css";
import getUser from "../services/auth";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleFormSubmit = (e) => {
		e.preventDefault();
		getUser(email, password);
	};

	return (
		<div className={styles.loginpage}>
			<div className={styles.innerDiv}>
				<form onSubmit={handleFormSubmit}>
					{/* <label htmlFor="email"> Email: </label> */}
					<h1>LOGIN</h1>
					<div className={styles.inputWrapper}>
						<img
							className={styles.icons}
							src="images/account-user-avatar.svg"
						/>
						<input
							type="email"
							name="email"
							id="email"
							value={email}
							placeholder="Email"
							className={styles.email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					{/* <label htmlFor="password"> Password: </label> */}
					<div className={styles.inputWrapper}>
						<img className={styles.icons} src="images/lock-alt.svg" />
						<input
							type="password"
							name="password"
							id="password"
							value={password}
							placeholder="Password"
							className={styles.password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<input type="submit" value="Log In" className={styles.button} />
				</form>
				<div className={styles.picture}>
					<h1>Picture</h1>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
