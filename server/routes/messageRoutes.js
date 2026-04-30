import express from "express";
import {
	getMessages,
	saveMessage,
	getLastTenMessages,
} from "../controllers/messageController.js";

export const router = express.Router();

router.route("/:coversationId").get(getMessages);

router.route("/saveMessage").post(saveMessage);

router.route("/getLastTenMessages/:roomId").get(getLastTenMessages);
