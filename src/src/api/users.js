import axios from "axios";

async function getAllUsers() {
	try {
		const response = await axios({
			method: "get",
			url: "/api/v1/user/",
			withCredentials: true,
		});

		return response.data;
	} catch (error) {
		throw error;
	}
}

export default getAllUsers;
