import httpServer from "../app.js";
import { Server } from "socket.io";

const io = new Server(httpServer, {
	cors: {
		origin: "*",
		methods: "*",
		connectionStateRecovery: {},
	},
});

const chatNameSpace = io.of("/chat");

chatNameSpace.on("connection", (socket) => {
	console.log("A user connected");

	socket.on("authenticate", (user) => {
		socket.user = {
			id: user.id,
			name: user.name,
		};
	});

	socket.on("join_room", (roomId) => {
		socket.join(roomId);
		socket.in(roomId).emit("joined_user", {
			username: socket.user?.name,
		});
	});

	socket.on("send_message", ({ roomId, message }) => {
		socket.in(roomId).emit("receive_message", {
			message,
			username: socket.user?.name,
			roomId,
		});
	});

	socket.on("leave_room", (roomId) => {
		socket.leave(roomId);
	});

	socket.on("disconnect", (reason) => {
		console.log(reason);
	});
});

// chatNameSpace.on("connection", (socket) => {
// 	console.log("User connected");
// 	//event for join a room
// 	socket.on("join", (roomId) => {
// 		console.log("User joined room");
// 		socket.join(roomId);
// 		socket.in(roomId).emit("userJoined", {
// 			joined: socket.id,
// 			msg: `User ${socket.id} just joined!`,
// 		});
// 		console.log("Should be emitted");
// 	});

// 	//event for leaving a room
// 	socket.on("leave", (roomId) => {
// 		console.log("User left room");
// 		socket.leave(roomId);
// 		socket.to(roomId).emit("userLeft", {
// 			left: socket.id,
// 			msg: `User ${socket.id} left the group chat!`,
// 		});
// 		console.log("Should be emitted");
// 	});

// 	//event for sending a message to rooms, could be an array in .to
// 	socket.on("sendMessage", ({ roomId, msg }) => {
// 		socket.in(roomId).emit("receiveMessage", {
// 			sender: socket.id,
// 			roomId,
// 			msg,
// 		});
// 		console.log("Should be emitted");
// 	});
// });
