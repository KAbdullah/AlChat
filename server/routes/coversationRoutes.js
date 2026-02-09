import express from "express";
import {
	createConversation,
	getConversations,
} from "../controllers/conversationController.js";
import { protect } from "../controllers/authController.js";

export const router = express.Router();

router.use(protect);

router.get("/", getConversations);
router.post("/createConversation", createConversation);
