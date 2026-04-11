import express from "express";
import Messages from "../models/messageModel.js";

export const getMessages = (req, res, next) => {};

//get handler to receive message
export const receiveMessage = (req, res) => {
	res.status(200).json({
		status: "success",
		data: {
			data: message,
		},
	});
};

//post handler to send message
export const sendMessage = (req, res) => {
	res.status(200).json({
		status: "success",
		data: {
			data: req.body,
		},
	});
};

export const saveMessage = async (req, res) => {
	const newMessage = await Messages.create({
		senderId: req.body.senderId,
		message: req.body.message,
		conversation: req.body.conversation,
	});

	res.status(201).json({
		status: "success",
		data: {
			data: newMessage,
		},
	});
};
