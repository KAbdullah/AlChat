import axios from "axios";

async function getUser(email, password) {
	try {
		const response = await axios({
			method: "post",
			url: "http://127.0.0.1:3000/api/v1/user/login",
			data: {
				emailAddress: email,
				password: password,
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}

export default getUser;
