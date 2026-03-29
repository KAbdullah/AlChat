import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import getAllUsers from "../api/users";
import createRoom from "../api/createRoom";
import { v6 as uuidv6 } from "uuid";
import { useDispatch } from "react-redux";
import { setCurrentRoomId } from "../store/appPageSlice";
import styles from "./CreateRoomModal.module.css";

function CreateRoomModal({ showModal, setShowModal }) {
	const modalRef = useRef(null);
	const result = useQuery({ queryKey: ["users"], queryFn: getAllUsers });
	const [usernames, setUsernames] = useState([]);
	const [error, setError] = useState();
	const [roomId, setRoomId] = useState(uuidv6());
	const dispatch = useDispatch();

	useEffect(() => {
		if (showModal) {
			setRoomId(uuidv6());
		}
	}, [showModal]);

	const mutation = useMutation({
		mutationFn: ({ usernames, roomId }) => createRoom({ usernames, roomId }),

		onSuccess: (data, variables, context) => {
			//1) Basically open the chat window
			dispatch(setCurrentRoomId(roomId));
			//2) Close the modal
			modalRef.current?.close();
		},
	});

	useEffect(() => {
		if (showModal) {
			modalRef.current?.showModal();
		} else if (!showModal) {
			modalRef.current?.close();
		}
	}, [showModal]);

	const handleAddingUser = (Id) => {
		setError();
		if (!usernames.includes(Id)) {
			setUsernames((prev) => [...prev, Id]);
		}
	};

	const handleRoomCreation = (e) => {
		e.preventDefault();
		if (usernames.length < 2) {
			setError("There must a minimum of two people in a group.");
			return;
		}
		mutation.mutate({ usernames, roomId });
	};

	return (
		<dialog ref={modalRef} className={styles.dialog}>
			{/* <input type="text" /> search bar when users are vast for the app.
      Maybe I'll come up with something better later on.*/}
			<ul>
				{result.status === "success" &&
					result.data.users.map((user) => (
						<li key={user._id}>
							<button onClick={() => handleAddingUser(user._id)}>
								{user.userName}
							</button>
						</li>
					))}
			</ul>
			<button onClick={() => setShowModal(!showModal)}> X</button>
			<button onClick={handleRoomCreation}>Create Room</button>
			{error ? <p>{error}</p> : null}
		</dialog>
	);
}

export default CreateRoomModal;
