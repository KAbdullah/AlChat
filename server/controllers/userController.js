import User from "../models/userModel.js";
import mongoose from "mongoose";

export const getAllUsers = async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		users,
	});
};

export const createUser = async (req, res, next) => {
	res.status(201).json({
		message: "User created",
	});
};

export const getUser = async (req, res, next) => {
	const user = req.params.id;

	res.status(200).json({
		message: "Found User",
		user,
	});
};

export const updateUser = () => {
	return null;
};

export const deleteUser = () => {
	return null;
};
