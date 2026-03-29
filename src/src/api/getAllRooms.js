import axios from "axios";

async function fetchAllRooms() {
	try {
		const reponse = await axios({
			method: "get",
			url: "/api/v1/conversations/",
		});
		return reponse;
	} catch (error) {
		throw error;
	}
}

export default fetchAllRooms;
