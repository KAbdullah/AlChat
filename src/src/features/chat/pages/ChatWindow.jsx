import styles from "./ChatWindow.module.css";
// import { TbVideo, TbPhone, TbDotsVertical } from "react-icons/tb";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
//This pattern of importing enforces the singleton pattern which avoid
//memory leaks but only creating one socket.io connection
import socket from "../../socket.jsx";
import { useDispatch } from "react-redux";
import {
	setCurrentRoomMessages,
	setCurrentRoomMessagesReverse,
} from "../../../store/appPageSlice.jsx";
import { useMutation } from "@tanstack/react-query";
import saveMessage from "../api/saveMessages.js";
import fetchLastTen from "../api/fetchLastTen.js";

//withCredentials required to send cookies

function ChatWindow({ roomId }) {
	// Will have a use state hook here to update the messages array
	const [message, setMessage] = useState("");
	const currentUserName = useSelector((state) => state.user.userName);
	const userId = useSelector((state) => state.user._id);
	const savedMessages = useSelector(
		(state) => state.appPage.currentRoomMessages,
	);
	const dispatch = useDispatch();

	const savedMessagesRef = useRef(savedMessages);

	useEffect(() => {
		savedMessagesRef.current = savedMessages;
	}, [savedMessages]);

	const mutation = useMutation({
		mutationFn: ({ senderId, message, conversation }) =>
			saveMessage(senderId, message, conversation),
	});

	const scrollMutation = useMutation({
		mutationFn: ({ roomId, lastTimeStamp }) => {
			console.log(lastTimeStamp);
			return fetchLastTen(roomId, lastTimeStamp);
		},
		//onSuccess already get's the data
		onSuccess: (data) => {
			const fetched = data.data.data;
			if (!fetched || fetched.length === 0) return;
			const newData = manageSuccessfulMutation(fetched);
			dispatch(setCurrentRoomMessagesReverse(newData));

			scrollMutation.reset();
		},
	});
	const scrollRef = useRef(null);

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

			dispatch(setCurrentRoomMessages(newMessage));
		};

		socket.on("receive_message", handleReceiveMessage);

		return () => {
			//Once we re-render, we must turn off the all previous socket
			//event listeners.
			// socket.off("receive_message", handleReceiveMessage);
			// socket.off("joined_user");
			socket.off("receive_message", handleReceiveMessage);
			socket.off("joined_user");
			socket.emit("leave_room", roomId);
			console.log("Cleaned up listeners");
		};
	}, [roomId]);

	const manageSuccessfulMutation = (data) => {
		return data.map((message) => ({
			conversation: message.conversation,
			message: message.message,
			senderId: message.senderId.userName,
			timeStamp: new Date(message.createdAt).getTime(),
		}));
	};

	//Add new messages to the current slice when we change rooms, last ten messages
	useEffect(() => {
		if (!savedMessages || savedMessages.length === 0) {
			console.log("Empty message mutation is firing");
			scrollMutation.mutate({
				roomId,
				lastTimeStamp: new Date().getTime(),
			});
		}
	}, [roomId]);

	//Here we only add message to the slice if the savedMessages state changes
	//If it doesn't then we don't fire any of the actions (besides the event
	//listener)
	useEffect(() => {
		const element = scrollRef.current;

		if (!element) return;

		const handleScroll = async () => {
			const isAtTop = element.scrollTop === 0;
			if (!isAtTop) return;
			if (scrollMutation.isPending) return;
			if (isAtTop) {
				//If current mutation is pending, add this guard so it doesn't
				//fire again while the first request is pending

				console.log("Scroll bar mutation is firing");
				scrollMutation.mutate({
					roomId,
					//Did optional chaining so if savedMessages is undefined not,
					//to proceed with getting the data
					lastTimeStamp: savedMessagesRef.current?.[0]?.["timeStamp"],
				});
			}
		};

		element.addEventListener("scroll", handleScroll);

		return () => {
			element.removeEventListener("scroll", handleScroll);
		};
	}, [roomId]);

	// useEffect(() => {
	// 	if (scrollMutation.isSuccess) {
	// 		const newData = manageSuccessfulMutation(scrollMutation.data.data.data);
	// 		dispatch(setCurrentRoomMessagesReverse(newData));

	// 		scrollMutation.reset();
	// 	}
	// }, [scrollMutation.isSuccess]);

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

		dispatch(setCurrentRoomMessages(newMessage));
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
			<div ref={scrollRef} className={styles.messages}>
				{savedMessages
					.filter((currMessage) => currMessage.conversation == roomId)
					.map((currMessage, index) => {
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
