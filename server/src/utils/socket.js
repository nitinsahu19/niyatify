const http = require("http");
const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log("socket Connected successfully");

    socket.on("join-chat", ({ userId, id }) => {
      const roomId = [userId, id].join("_");

      console.log("Chat joined with room id -> " + roomId);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected successfully");
    });
  });
};

module.exports = { initializeSocket };
