import { useState, useRef, useEffect } from "react";
import { v6 as uuidv6 } from "uuid";
import { useQuery } from "@tanstack/react-query";
import getAllUsers from "../api/users";

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
	const result = useQuery({ queryKey: ["users"], queryFn: getAllUsers });

	useEffect(() => {
		if (showModal) {
			modalRef.current?.showModal();
		} else if (!showModal) {
			modalRef.current?.close();
		}
	}, [showModal]);

	return (
		<dialog ref={modalRef}>
			<ul>
				{result.status === "success" &&
					result.data.users.map((user) => (
						<li key={user._id}>
							<button>{user.userName}</button>
						</li>
					))}
			</ul>
			<button onClick={() => setShowModal(!showModal)}> X</button>
		</dialog>
	);
}

export default CreateRoom;
