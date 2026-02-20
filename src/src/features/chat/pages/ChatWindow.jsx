import styles from "./ChatWindow.module.css";
import { io } from "socket.io-client";
import { TbVideo, TbPhone, TbDotsVertical } from "react-icons/tb";

const socket = io("http://localhost:3000/chat");

function ChatWindow() {
	return (
		<div>
			<div className={styles.header}>
				<ul className={styles.icons}>
					<li className={styles.icon}>
						<TbVideo />{" "}
					</li>
					<li className={styles.icon}>
						<TbPhone />
					</li>
					<li className={styles.icon}>
						<TbDotsVertical />
					</li>
				</ul>
			</div>
			<div></div>
			<div>
				<input type="text" />
				<button>Send</button>
			</div>
		</div>
	);
}

export default ChatWindow;
