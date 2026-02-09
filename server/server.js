import mongoose from "mongoose";
import dotenvx from "@dotenvx/dotenvx";
dotenvx.config({ path: "./config.env" });
import httpServer from "./app.js";
import "./sockets/socket.js";

const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_CONNECTION_STRING;

await mongoose
	.connect(dbURI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((error) =>
		console.error("Error connecting to MongoDB: ", error.message),
	);

httpServer.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
