import axios from "axios";

async function getUser(email, password) {
	console.log(email, password);
	try {
		const response = await axios({
			method: "post",
			url: "http://127.0.0.1:3000/api/v1/user/login",
			data: {
				emailAddress: email,
				password: password,
			},
		});
		console.log(response);
		return response.data;
	} catch (error) {
		console.log(error);
	}
}

export default getUser;
