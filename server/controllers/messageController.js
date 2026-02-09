import express from "express";

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
