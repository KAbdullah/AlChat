import styles from "./ChatWindow.module.css";
import { TbVideo, TbPhone, TbDotsVertical } from "react-icons/tb";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "../../socket.jsx";

//withCredentials required to send cookies

function ChatWindow() {
	// Will have a use state hook here to update the messages array
	const [windowMessages, setWindowMessages] = useState([]);

	const { firstName, lastName, id } = useSelector((store) => store.user);

	useEffect(() => {
		socket.connect();
		socket.on("connect", () => {
			console.log(socket.id);
			console.log(socket.connected);

			socket.emit("authenticate", { firstName, lastName, id });

			return () => {
				socket.disconnect();
				console.log("We disconnedted");
			};
		});
	}, [firstName, lastName, id]);

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
