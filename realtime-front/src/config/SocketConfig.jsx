import { createContext } from "react";
import io from "socket.io-client";
import url from "./initConfig";

export const socket = io.connect(url);
export const SocketContext = createContext(socket);
