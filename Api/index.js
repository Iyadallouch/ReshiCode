const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors"); // Import CORS middleware

const app = express();
const server = http.createServer(app);

// Use CORS to allow requests from the frontend
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.1.39:3000"], // Allow requests from React
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.1.39:3000"], // Allow requests from React
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("Chat server is running");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
