import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createSendToken = (user, status, req, res) => {
	const token = signToken(user._id);

	res.cookie("jwt", token, {
		expiresIn: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 24,
		),
		httpOnly: true,
		secure: req.secure || req.headers["x-forwarded-proto"] === "https",
	});

	user.password = undefined;

	res.status(status).json({
		status: "success",
		token,
		data: {
			user,
		},
	});
};

export const signup = async (req, res, next) => {
	const newUser = await User.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		emailAddress: req.body.emailAddress,
		password: req.body.password,
	});

	createSendToken(newUser, 201, req, res);
};

export const login = async (req, res, next) => {
	const { emailAddress, password } = req.body;

	if (!emailAddress || !password) {
		return next(new Error("Email or Password is missing"));
	}

	const user = await User.findOne({ emailAddress });

	if (!user || !(await user.checkPassword(password, user.password))) {
		return next(new Error("User doesn't exist or password is incorrect!"));
	}

	createSendToken(user, 201, req, res);
};

export const protect = async (req, res, next) => {
	// Check if a token exists
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		return next(new Error("You are not logged in, please log in", 401));
	}

	// If it does exist, then we verify if it's valid
	const verified = await jwt.verify(token, process.env.JWT_SECRET);

	// Check if user exists with that jwt token
	const user = await User.findById(verified.id);

	if (!user) {
		return next(new Error("User no longer exists!", 401));
	}

	req.user = user;
	next();
};
