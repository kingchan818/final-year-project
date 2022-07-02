import { Server, Socket } from 'socket.io';
export interface User {
    user: any;
    userConnections: any[];
}
export interface DefaultEventsMap {
    [event: string]: (...args: any[]) => void;
}

export interface SocketData extends Socket {
    currentUser: User;
}

export const CONNECTION = 'userConnections';
