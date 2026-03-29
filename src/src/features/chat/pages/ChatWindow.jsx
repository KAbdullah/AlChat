import styles from "./ChatWindow.module.css";
import { TbVideo, TbPhone, TbDotsVertical } from "react-icons/tb";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "../../socket.jsx";

//withCredentials required to send cookies

function ChatWindow({ roomId }) {
	// Will have a use state hook here to update the messages array
	const [message, setMessage] = useState("");
	const currentUserName = useSelector((state) => state.user.userName);
	console.log(currentUserName);

	useEffect(() => {
		socket.connect();
		socket.on("connect", () => {
			console.log(socket.id);
			console.log(socket.connected);
		});
		socket.emit("join_room", roomId);
		socket.on("joined_user", (data) => {
			console.log("This person:" + data.userName + " joined the room.");
		});

		socket.on("receive_message", ({ roomId, message, currentUserName }) => {
			console.log(currentUserName, message, roomId);
		});

		return () => {
			socket.disconnect();
			console.log("We disconnedted");
		};
	}, [roomId]);

	const sendMessages = () => {
		socket.emit("send_message", { roomId, message, currentUserName });
	};

	return (
		<div className={styles.chatWindow}>
			<div className={styles.header}>
				<ul className={styles.icons}>
					<li className={styles.icon}>
						<TbVideo />
					</li>
					<li className={styles.icon}>
						<TbPhone />
					</li>
					<li className={styles.icon}>
						<TbDotsVertical />
					</li>
				</ul>
			</div>
			<div className={styles.main}>The messages will show here</div>
			<div className={styles.inputArea}>
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				></input>
				<button onClick={sendMessages}>Send</button>
			</div>
		</div>
	);
}

export default ChatWindow;
