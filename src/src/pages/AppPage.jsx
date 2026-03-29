import { useEffect } from "react";
import ShowRooms from "../components/createRoom";
import ChatWindow from "../features/chat/pages/ChatWindow";
import { useSelector } from "react-redux";
import styles from "./AppPage.module.css";

function AppPage() {
	const roomId = useSelector((state) => state.appPage.currentRoomId);

	// Receiving the Room ID now,
	// I will use this Room ID to basically open a chatWindow anytime we have a
	// currentRoomId set
	useEffect(() => {
		console.log(roomId);
	}, [roomId]);

	return (
		<div className={styles.appContainer}>
			<div className={styles.roomsSection}>
				<ShowRooms />
			</div>
			<div className={styles.chatSession}>
				{roomId ? <ChatWindow roomId={roomId} /> : null}
			</div>
		</div>
	);
}

export default AppPage;
