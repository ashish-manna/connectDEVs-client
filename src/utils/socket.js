import { io } from "socket.io-client";

export const createSocket = () => {
  if (location.hostname === "localhost") {
    return io(import.meta.env.VITE_SOCKET_SEVER_URL, { withCredentials: true });
  } else {
    return io("/", { path: `/${import.meta.env.VITE_SOCKET_SEVER_PROD_PATH}` });
  }
};
