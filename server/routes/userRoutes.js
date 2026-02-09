import express from "express";
import {
	getAllUsers,
	createUser,
	getUser,
	updateUser,
	deleteUser,
} from "../controllers/userController.js";
import { login, signup } from "../controllers/authController.js";

export const router = express.Router();

// Here we will need the API to have a few things

// Here we want to get all users, get one user, update a user, create a user,
// and delete a user

router.post("/signup", signup);
router.post("/login", login);

router.route("/").get(getAllUsers);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
