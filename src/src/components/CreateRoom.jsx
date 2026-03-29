import { useState } from "react";
import { v6 as uuidv6 } from "uuid";

import CreateRoomModal from "./CreateRoomModal";
import { useQuery } from "@tanstack/react-query";
import fetchAllRooms from "../api/getAllRooms";
import ChatWindow from "../features/chat/pages/ChatWindow";
import { useDispatch } from "react-redux";
import { setCurrentRoomId } from "../store/appPageSlice";

function ShowRooms() {
	const [showModal, setShowModal] = useState(false);
	const { data, status } = useQuery({
		queryKey: ["chats"],
		queryFn: fetchAllRooms,
	});
	const dispatch = useDispatch();

	if (status === "loading") return <p>Loading rooms...</p>;

	const conversations =
		status === "success" ? data?.data?.data?.conversations : [];

	const handleRoomCreation = () => {
		setShowModal(true);
	};

	const handleChatWindow = (e) => {
		dispatch(setCurrentRoomId(e.target.value));
	};

	return (
		<div>
			{conversations.map((conversation) => {
				return (
					<button
						value={conversation._id}
						key={conversation._id}
						onClick={(e) => handleChatWindow(e)}
					>
						{conversation._id}
					</button>
				);
			})}
			<button onClick={handleRoomCreation}>Create Room</button>
			<CreateRoomModal showModal={showModal} setShowModal={setShowModal} />
		</div>
	);
}

export default ShowRooms;
