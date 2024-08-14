"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const newWsServer = (httpServer) => {
    const wsServer = new socket_io_1.Server(httpServer, {
        cors: {
            origin: '*',
            credentials: true,
        },
    });
    wsServer.on("connection", (socket) => {
        console.log("new client connect");
        socket.on("parseUser", (user) => {
            socket.data.user = user;
        });
    });
    return wsServer;
};
exports.default = newWsServer;
