import socketIO from "socket.io-client";
const EndPoint = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
export const socketId = socketIO(EndPoint,{ transports: ["websocket"] });