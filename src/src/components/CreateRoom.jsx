import { useState, useRef, useEffect } from "react";
import { v6 as uuidv6 } from "uuid";
import { useMutation, useQuery } from "@tanstack/react-query";
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
	const [username, setUsername] = useState([]);
	// The plan is, once the people have been added to the username array
	// and the create room button has been clicked, useMutation will use axios
	// to make a call to add users into conversationModel.
	// useMutation to get loading state so modal doesn't close until successful
	// then this room will showup on the side bar, and when you click on it
	// you open the room and the socket.io-client makes a request to the backend
	// creating a room and adding users to that room. How do we get the roomId and usernameIds?
	// We send the roomId through the socket.io frontend, and then we make a request from the
	// backend to the backend to get the users and then add them to the room.
	const chatRoom = useMutation();

	useEffect(() => {
		if (showModal) {
			modalRef.current?.showModal();
		} else if (!showModal) {
			modalRef.current?.close();
		}
	}, [showModal]);

	const handleAddingUser = (e) => {
		if (!username.includes(e.target.textContent)) {
			setUsername((prev) => [...prev, e.target.textContent]);
		}
	};

	return (
		<dialog ref={modalRef}>
			{/* <input type="text" /> search bar when users are vast for the app.
      Maybe I'll come up with something better later on.*/}
			<ul>
				{result.status === "success" &&
					result.data.users.map((user) => (
						<li key={user._id}>
							<button onClick={handleAddingUser}>{user.userName}</button>
						</li>
					))}
			</ul>
			<button onClick={() => setShowModal(!showModal)}> X</button>
		</dialog>
	);
}

export default CreateRoom;
