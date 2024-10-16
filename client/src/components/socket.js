import { io } from "socket.io-client";
const apiUrl = process.env.REACT_APP_API_URL;

// Create a single instance of the socket connection
const socket = io(`${apiUrl}:3001`, {
  autoConnect: false, // To prevent immediate connection
});

export default socket;
