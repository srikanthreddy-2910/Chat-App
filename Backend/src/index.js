import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { setupSocket } from "./lib/socket.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const server = createServer(app);
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chat-app-frontend-fwvh-e0trh9zue.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

setupSocket(server);

server.listen(PORT, () => {
  console.log("✅ Server is running on PORT:", PORT);
  connectDB();
});
