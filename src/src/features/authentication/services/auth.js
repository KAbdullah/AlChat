import axios from "axios";

async function getUser(email, password) {
	try {
		const response = await axios({
			method: "post",
			url: "/api/v1/user/login",
			data: {
				emailAddress: email,
				password: password,
			},
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}

export default getUser;
