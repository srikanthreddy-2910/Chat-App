import { Server } from "socket.io";

let ioInstance;
const userSocketMap = {}; // {userId: socketId}

export function setupSocket(server) {
  ioInstance = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://chat-app-frontend-fwvh-e0trh9zue.vercel.app",
      ],
      credentials: true,
    },
  });

  console.log("✅ Socket.io server initialized");

  ioInstance.on("connection", (socket) => {
    console.log("✅ A user connected:", socket.id);
    const userId = socket.handshake.query.userId;
    console.log("🔹 Received userId in handshake:", userId);

    if (userId) {
      userSocketMap[userId] = socket.id;
      console.log("🔹 Updated userSocketMap:", userSocketMap);
    }

    ioInstance.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("⚠️ A user disconnected:", socket.id);
      delete userSocketMap[userId];
      ioInstance.emit("getOnlineUsers", Object.keys(userSocketMap));
      console.log("🔹 userSocketMap after disconnect:", userSocketMap);
    });
  });
}

export function getIO() {
  console.log("📌 getIO called. ioInstance exists?", !!ioInstance);
  return ioInstance;
}

export function getReceiverSocketId(userId) {
  console.log("📌 getReceiverSocketId called with userId:", userId);
  console.log("📌 Current userSocketMap:", userSocketMap);
  return userSocketMap[userId];
}
