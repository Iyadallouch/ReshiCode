import { io } from "socket.io-client";
const socketServerUrl = process.env.REACT_APP_API_URL2;

// Create a single instance of the socket connection
const socket = io(`${socketServerUrl}`, {
  autoConnect: false, // To prevent immediate connection
});

export default socket;
