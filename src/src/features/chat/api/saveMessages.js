import axios from "axios";

async function saveMessage(senderId, message, conversation) {
	try {
		const response = await axios({
			method: "post",
			url: "/api/v1/message/saveMessage",
			data: {
				senderId,
				message,
				conversation,
			},
			withCredentials: true,
		});

		return response.data;
	} catch (error) {
		throw error;
	}
}

export default saveMessage;
