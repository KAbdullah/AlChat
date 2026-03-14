import axios from "axios";

async function getUser({ email, password }) {
	try {
		const response = await axios.post(
			"http://localhost:3000/api/v1/user/login",
			{
				emailAddress: email,
				password: password,
			},
		);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
}
