import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { createContext } from "react";

const serverAddr = "http://localhost:5001";
const wsServer = io(serverAddr);
export const SocketContext =
  createContext<Socket<DefaultEventsMap, DefaultEventsMap>>(wsServer);
