import { useState, useRef, useEffect } from "react";
import { v6 as uuidv6 } from "uuid";

function CreateRoom() {
	const [showModal, setShowModal] = useState(false);

	const handleRoomCreation = () => {
		setShowModal(true);
		const roomId = uuidv6();
	};

	return (
		<div>
			<button onClick={handleRoomCreation}>Create Room</button>
			<CreateRoomModal showModal={showModal} setShowModal={setShowModal} />
		</div>
	);
}

function CreateRoomModal({ showModal, setShowModal }) {
	const modalRef = useRef(null);

	useEffect(() => {
		if (showModal) {
			modalRef.current?.showModal();
		} else if (!showModal) {
			modalRef.current?.close();
		}
	}, [showModal]);

	return (
		<dialog ref={modalRef}>
			<button onClick={() => setShowModal(!showModal)}> X</button>
		</dialog>
	);
}

export default CreateRoom;
