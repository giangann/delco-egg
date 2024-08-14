import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { createContext } from "react";
import { baseWsUrl } from "../lib/query/request";

const wsServer = io(baseWsUrl);
export const SocketContext =
  createContext<Socket<DefaultEventsMap, DefaultEventsMap>>(wsServer);
