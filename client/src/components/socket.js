import { io } from "socket.io-client";

// Create a single instance of the socket connection
const socket = io("http://192.168.1.39:3001", {
  autoConnect: false, // To prevent immediate connection
});

export default socket;
