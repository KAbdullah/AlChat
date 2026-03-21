import { v6 as uuidv6 } from "uuid";

function CreateRoom() {
	const handleRoomCreation = () => {
		const roomId = uuidv6();
	};

	return (
		<div>
			<button onClick={handleRoomCreation}>Create Room</button>
		</div>
	);
}

export default CreateRoom;
