import http from 'http';
import { Server } from 'socket.io';
import { IWsServer } from 'ws-server.interface';

const newWsServer = (httpServer: http.Server) => {
  const wsServer: IWsServer = new Server(httpServer, {
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

export default newWsServer;
