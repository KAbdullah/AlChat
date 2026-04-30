import mongoose from "mongoose";

const { Schema } = mongoose;

const conversationSchema = Schema(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: [true, "A conversation must be between participants."],
			},
		],
		roomId: {
			type: "String",
			required: [true, "A coversation needs to have a roomId"],
			unique: true,
		},
	},
	{
		timestamps: true,
	},
);

// Makes the query
// Conversation.find({ participants: myId }).sort({ updatedAt: -1 })
// very fast. This query will be used a lot because when we get the latest
// active chats in descending order along with their users, this is
// when it comes in handy
conversationSchema.index({ participants: 1, updatedAt: -1 });

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
