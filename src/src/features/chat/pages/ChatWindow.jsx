import styles from "./ChatWindow.module.css";
import { io } from "socket.io-client";
import { TbVideo, TbPhone, TbDotsVertical } from "react-icons/tb";
import { useState } from "react";

const socket = io("http://localhost:3000/chat");

function ChatWindow() {
	// Will have a use state hook here to update the messages array
	const [windowMessages, setWindowMessages] = useState([]);

	const sendMessages = () => {};

	return (
		<div>
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
			<div>The messages will show here</div>
			<div>
				<input type="text"></input>
				<button onClick={sendMessages}>Send</button>
			</div>
		</div>
	);
}

export default ChatWindow;
