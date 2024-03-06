import { Server } from 'socket.io';
import { IUserRecord } from 'user.interface';

export interface ClientToServerEvents {
  hello: () => void;
  parseUser: (user: Omit<IUserRecord, 'password'>) => void;
}
export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  newNoti: (noti: { order_id: number }) => void;
  updateOrder: (order: { order_id: number }) => void;
  updateListOrder: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  user?: Omit<IUserRecord, 'password'>;
}

export interface IWsServer
  extends Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  > {}
