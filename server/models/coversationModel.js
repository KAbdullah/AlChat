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
	},
	{
		timestamps: true,
	},
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
