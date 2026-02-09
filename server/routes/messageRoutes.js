import express from "express";
import { getMessages } from "../controllers/messageController.js";

export const router = express.Router();

router.route("/:coversationId").get(getMessages);
