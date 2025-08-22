import { io } from "socket.io-client";

export const createSocket = () => {
  return io(import.meta.env.VITE_SOCKET_SEVER_URL, { withCredentials: true });
};
