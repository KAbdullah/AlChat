import express from "express";
import { createServer } from "node:http";
import { router as messageRouter } from "./routes/messageRoutes.js";
import { router as userRouter } from "./routes/userRoutes.js";
import { router as conversationRouter } from "./routes/coversationRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/conversations", conversationRouter);

export default httpServer;
