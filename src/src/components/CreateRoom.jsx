import { useState } from "react";
import { v6 as uuidv6 } from "uuid";

import CreateRoomModal from "./CreateRoomModal";

function ShowRooms() {
	const [showModal, setShowModal] = useState(false);

	const handleRoomCreation = () => {
		setShowModal(true);
	};

	return (
		<div>
			<button onClick={handleRoomCreation}>Create Room</button>
			<CreateRoomModal showModal={showModal} setShowModal={setShowModal} />
		</div>
	);
}

export default ShowRooms;
