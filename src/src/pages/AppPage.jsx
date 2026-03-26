import ShowRooms from "../components/createRoom";
import ChatWindow from "../features/chat/pages/ChatWindow";

function AppPage() {
	return (
		<div>
			<h1>Hello there.</h1>
			<ShowRooms />
			<ChatWindow />
		</div>
	);
}

export default AppPage;
