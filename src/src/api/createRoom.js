import axios from "axios";

async function createRoom({ usernames, roomId }) {
	// Using axios call to make a room between those two users
	console.log(usernames, roomId);
	try {
		const response = axios({
			method: "post",
			url: "/api/v1/conversations/createConversation",
			data: {
				usernames: usernames,
				roomId: roomId,
			},
			withCredentials: true,
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export default createRoom;
