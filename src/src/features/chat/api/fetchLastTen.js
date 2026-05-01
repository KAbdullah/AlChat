import axios from "axios";

async function fetchLastTen(roomId, timing) {
	try {
		const response = await axios({
			method: "get",
			url: `/api/v1/message/getLastTenMessages/${roomId}`,
			//The name is deceiving, this is actually query parameters
			params: {
				timing: timing,
			},
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}

export default fetchLastTen;
