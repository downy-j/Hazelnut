import { io } from "socket.io-client";

// 소켓 객체
const socket = io("http://localhost:5000");

export default socket;
