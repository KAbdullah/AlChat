import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Message must have a user."],
		},
		message: {
			type: String,
			required: [true, "Message must have message."],
		},
		conversation: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Message must belong to a conversation."],
		},
	},
	{
		timestamps: true,
	},
);

const Messages = mongoose.model("Messages", messagesSchema);

export default Messages;
