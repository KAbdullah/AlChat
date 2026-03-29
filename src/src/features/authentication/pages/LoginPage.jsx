import { useState } from "react";
import styles from "./LoginPage.module.css";
import getUser from "../services/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../store/userSlice";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	let navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: ({ email, password }) => getUser(email, password),

		onSuccess: (data) => {
			//Exposes cookie unnecessarily
			// localStorage.setItem("userToken", data.token);
			const { emailAddress, firstName, lastName, userName, _id } =
				data.data.user;
			dispatch(
				setUserInfo({ firstName, lastName, emailAddress, _id, userName }),
			);
			navigate("/app");

			//The backend gets the token with each request in the header,
			//this unnecessarily exposes the cookie in the front-end to potential hackers
			// dispatch(
			// 	setUserInfo({
			// 		firstName: data.data.user.firstName,
			// 		lastName: data.data.user.lastName,
			// 		emailAddres: data.data.user.emailAddress,
			// 		id: data.data.user._id,
			// 		token: data.token,
			// 	}),
			// );
		},
	});

	//So we have our function over here that handlesFormSubmit
	const handleFormSubmit = (e) => {
		e.preventDefault();
		mutation.mutate({ email, password });
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
					{mutation.isError && <div>Incorrect Email or Password</div>}
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
