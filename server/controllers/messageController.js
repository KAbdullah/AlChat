import express from "express";
import Messages from "../models/messageModel.js";
import { APIFeatures } from "../utils/apiFeatures.js";

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

export const getLastTenMessages = async (req, res) => {
	//Don't need to set the rest of the queries because you can just pass
	//it into the axios url in the frontend
	req.query.limit = "10";
	const roomId = req.params.roomId;

	//We don't need to populate, we can simply refer to the other schema's
	//attribute if we got a reference to the other schema
	const query = Messages.find({ conversation: roomId });
	//Pass active query into APIFeatures class to run cursorPaginate()
	const features = new APIFeatures(query, req.query).cursorPaginate();
	//We finally execute the query promise with .query
	const messages = await features.query;

	res.status(200).json({
		status: "success",
		data: {
			data: messages,
		},
	});
};
