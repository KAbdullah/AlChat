import { io } from "socket.io-client";

const socket = io("http://localhost:3000/chat", {
	withCredentials: true,
	// Cause an automatic reconnection after disconnection
	autoConnect: true,
});

export default socket;
