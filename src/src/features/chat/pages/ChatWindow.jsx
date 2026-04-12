import styles from "./ChatWindow.module.css";
// import { TbVideo, TbPhone, TbDotsVertical } from "react-icons/tb";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//This pattern of importing enforces the singleton pattern which avoid
//memory leaks but only creating one socket.io connection
import socket from "../../socket.jsx";
import { useDispatch } from "react-redux";
import { setCurrentRoomMessages } from "../../../store/appPageSlice.jsx";
import { useMutation } from "@tanstack/react-query";
import saveMessage from "../api/saveMessages.js";

//withCredentials required to send cookies

function ChatWindow({ roomId }) {
	// Will have a use state hook here to update the messages array
	const [message, setMessage] = useState("");
	const currentUserName = useSelector((state) => state.user.userName);
	const userId = useSelector((state) => state.user._id);
	const savedMessages = useSelector(
		(state) => state.appPage.currentRoomMessages,
	);
	const [allMessages, setAllMessages] = useState(savedMessages || []);
	const dispatch = useDispatch();
	const mutation = useMutation({
		mutationFn: ({ senderId, message, conversation }) =>
			saveMessage(senderId, message, conversation),
	});

	useEffect(() => {
		socket.connect();
		socket.on("connect", () => {
			console.log(socket.id);
			console.log(socket.connected);
		});
		socket.emit("join_room", roomId);
		socket.on("joined_user", (data) => {
			console.log("This person:" + data.userName + " joined the room.");
		});

		const handleReceiveMessage = ({
			roomId,
			message,
			sendingUserName,
			timeStamp,
		}) => {
			const newMessage = {
				senderId: sendingUserName,
				message: message,
				conversation: roomId,
				timeStamp: timeStamp,
			};

			setAllMessages((prev) => {
				//This way, we ensure that only the fresh data is being saved via
				//dispatch. The const block ensures the new data is added.
				const updatedmessage = [...prev, newMessage];
				return updatedmessage;
			});

			dispatch(setCurrentRoomMessages((prev) => [...prev, newMessage]));
		};

		socket.on("receive_message", handleReceiveMessage);

		return () => {
			//Once we re-render, we must turn off the all previous socket
			//event listeners.
			// socket.off("receive_message", handleReceiveMessage);
			// socket.off("joined_user");
			socket.off("receive_message", handleReceiveMessage);
			socket.off("joined_user");
			console.log("Cleaned up listeners");
		};
	}, [roomId]);

	const sendMessages = () => {
		const currDateAndTime = Date.now();
		socket.emit("send_message", {
			roomId,
			message,
			currentUserName,
			timeStamp: currDateAndTime,
		});

		const newMessage = {
			senderId: currentUserName,
			message: message,
			conversation: roomId,
			timeStamp: currDateAndTime,
		};
		setAllMessages((prev) => {
			const updatedMessage = [...prev, newMessage];
			return updatedMessage;
		});

		dispatch(setCurrentRoomMessages((prev) => [...prev, newMessage]));
		setMessage("");
		console.log("MUTATE CALLED");
		mutation.mutate({
			senderId: userId,
			message,
			conversation: roomId,
		});
	};

	function formatTime(timeStamp) {
		return timeStamp;
	}

	const handleEnter = (e) => {
		if (e.key === "Enter") {
			sendMessages();
		}
	};

	return (
		<div className={styles.chatWindow}>
			<div className={styles.header}>
				<ul className={styles.icons}>
					<li className={styles.icon}>📹</li>
					<li className={styles.icon}>📞</li>
					<li className={styles.icon}>⋮</li>
				</ul>
			</div>
			<div className={styles.messages}>
				{allMessages.map((currMessage, index) => {
					return (
						<div
							key={index}
							className={`${styles.messageWrapper} ${
								currMessage.senderId === currentUserName
									? styles.selfWrapper
									: styles.otherWrapper
							}`}
						>
							{currMessage.senderId !== currentUserName && (
								<h3 className={styles.senderName}>{currMessage.senderId}</h3>
							)}

							<div
								className={` ${styles.bubble} ${
									currMessage.senderId === currentUserName
										? styles.selfBubble
										: styles.otherBubble
								}`}
							>
								{currMessage.message}
							</div>

							<div className={styles.timestamp}>
								{formatTime(currMessage.timeStamp)}
							</div>
						</div>
					);
				})}
			</div>

			<div className={styles.inputArea}>
				<input
					type="text"
					id="#messageInput"
					value={message}
					className={styles.messageInputField}
					onKeyDown={handleEnter}
					onChange={(e) => setMessage(e.target.value)}
				></input>
				<button onClick={sendMessages} className={styles.sendButton}>
					Send
				</button>
			</div>
		</div>
	);
}

export default ChatWindow;
