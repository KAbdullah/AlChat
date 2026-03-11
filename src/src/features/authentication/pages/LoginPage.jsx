import { useState } from "react";
import styles from "./LoginPage.module.css";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState();

	const handleFormSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<label htmlFor="email"> Email: </label>
				<input
					type="email"
					name="email"
					id="email"
					value={email}
					placeholder="example@gmail.com"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<label htmlFor="password"> Password: </label>
				<input
					type="password"
					name="password"
					id="password"
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<input type="submit" value="Log In" />
			</form>
		</div>
	);
}

export default LoginPage;
