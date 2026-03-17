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
		},
	},
	{
		timestamps: true,
	},
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
