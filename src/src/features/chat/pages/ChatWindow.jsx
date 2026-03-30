import styles from "./ChatWindow.module.css";
import { TbVideo, TbPhone, TbDotsVertical } from "react-icons/tb";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//This pattern of importing enforces the singleton pattern which avoid
//memory leaks but only creating one socket.io connection
import socket from "../../socket.jsx";

//withCredentials required to send cookies

function ChatWindow({ roomId }) {
	// Will have a use state hook here to update the messages array
	const [message, setMessage] = useState("");
	const currentUserName = useSelector((state) => state.user.userName);
	const [allMessages, setAllMessages] = useState([]);

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

		const handleReceiveMessage = ({ roomId, message, currentUserName }) => {
			setAllMessages((prev) => [...prev, message]);
		};

		socket.on("receive_message", handleReceiveMessage);

		return () => {
			//Once we re-render, we must turn off the all previous socket
			//event listeners.
			// socket.off("receive_message", handleReceiveMessage);
			// socket.off("joined_user");
			socket.off();
			console.log("Cleaned up listeners");
		};
	}, [roomId]);

	const sendMessages = () => {
		socket.emit("send_message", { roomId, message, currentUserName });
		setAllMessages((prev) => [...prev, message]);
		setMessage("");
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
			<div className={styles.messages}>
				{allMessages.map((currMessage, index) => {
					return (
						<div key={index} className={styles.main}>
							{currMessage}
						</div>
					);
				})}
			</div>

			<div className={styles.inputArea}>
				<input
					type="text"
					id="#messageInput"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				></input>
				<button onClick={sendMessages}>Send</button>
			</div>
		</div>
	);
}

export default ChatWindow;
