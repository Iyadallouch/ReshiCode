import { io } from "socket.io-client";

// Create a single instance of the socket connection
const socket = io("http://localhost:3001", {
  autoConnect: false, // To prevent immediate connection
});

export default socket;
