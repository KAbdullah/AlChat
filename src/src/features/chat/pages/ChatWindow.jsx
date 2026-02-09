import styles from "./ChatWindow.module.css";

function ChatWindow() {
	return (
		<div>
			<div className={styles.header}> --------------------</div>
			<div></div>
			<div>
				<input type="text" />
				<button>Send</button>
			</div>
		</div>
	);
}

export default ChatWindow;
