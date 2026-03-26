import Conversation from "../models/coversationModel.js";

export const getConversations = async (req, res, next) => {
	// Need to load conversations which the current logged user is a part of

	const user = req.user;

	const allConversations = await Conversation.find({
		participants: req.user._id,
	});

	res.status(200).json({
		message: "Successful",
		data: { conversations: allConversations },
	});
};

export const createConversation = async (req, res, next) => {
	const { usernames, roomId } = req.body;

	const data = await Conversation.create({
		participants: usernames,
		roomId: roomId,
	});

	res.status(200).json({
		message: "Successful",
		data: {
			data,
		},
	});
};
