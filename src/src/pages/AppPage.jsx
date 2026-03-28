import { useEffect } from "react";
import ShowRooms from "../components/createRoom";
import ChatWindow from "../features/chat/pages/ChatWindow";
import { useSelector } from "react-redux";

function AppPage() {
	const roomId = useSelector((state) => state.appPage.currentRoomId);

	// Receiving the Room ID now,
	// I will use this Room ID to basically open a chatWindow anytime we have a
	// currentRoomId set
	useEffect(() => {
		console.log(roomId);
	}, [roomId]);

	return (
		<div>
			<h1>Hello there.</h1>
			<ShowRooms />
			<ChatWindow />
		</div>
	);
}

export default AppPage;
