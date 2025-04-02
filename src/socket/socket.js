import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_APP_BASE_URL, {
  reconnectionDelayMax: 10000,
});
