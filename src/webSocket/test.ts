import { Server, Socket } from 'socket.io';
import http from 'http';
import initRedis from './redis/index';
import Authenticaton from './middlewares/Auth';
import firebaseInit from './firebase';
import { instrument } from '@socket.io/admin-ui';

const httpServer = http.createServer();
const redisClient = initRedis();
firebaseInit();
const io = new Server(httpServer, { cors: { origin: '*' } });

io.use(async (socket: Socket, next) => {
    // every connection estliblished need JWT or NEW SESSIONTO REDIS
    console.log('loaded');
    console.log('token id', socket.handshake.auth.token);
    const auth = new Authenticaton(redisClient, socket);
    await auth.jwtWatcher();
    next();
});

io.on('connection', (socket: Socket) => {
    console.log('connection established...........');
    console.log('user connection id', socket.id);
    const currentUser = socket.data.currentUser;
    socket.on('private-message', (arg: { connectionId: string; msg: string }) => {
        // find the connected user is active
        console.log(arg.msg);
        console.log(arg.connectionId);
        console.log(currentUser);
        socket.to(arg.connectionId).emit('receive-message', {
            currentUser,
            msg: arg.msg,
        });
    });
    socket.on('disconnect', () => {
        //remove currentUserId in redis
    });
});

io.engine.on('connection_error', (err: any) => {
    console.log(err.req); // the request object
    console.log(err.code); // the error code, for example 1
    console.log(err.message); // the error message, for example "Session ID unknown"
    console.log(err.context); // some additional error context
});
instrument(io, {
    auth: false,
});

httpServer.listen(8080, () => {
    console.log('listening to socket port 8080');
});
