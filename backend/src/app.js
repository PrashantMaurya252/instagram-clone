import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";

import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";

const app = express();

const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    cors({
        origin: process.env.URL,
        credentials: true,
    })
);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/conversation", conversationRoutes);
app.use("/api/v1/group", groupRoutes);

export { app, server };