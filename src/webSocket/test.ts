import { Server, Socket } from 'socket.io';
import http from 'http';
import initRedis from './redis/index';
import Authenticaton from './middlewares/Auth';
import admin from 'firebase-admin';
import * as dotenv from 'dotenv';
dotenv.config();

const httpServer = http.createServer().listen(8080, () => {
    console.log('listening to socket port 8080');
});
const redisClient = initRedis();
const io = new Server(httpServer, { cors: { origin: '*' } });
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
admin.initializeApp(firebaseConfig);

io.use(async (socket: Socket, next) => {
    // every connection estliblished need JWT or NEW SESSIONTO REDIS
    console.log('loaded');
    console.log('token id', socket.handshake.auth.token);
    const auth = new Authenticaton(redisClient, socket);
    await auth.jwtWatcher();
    // const authenticatedUser = await firebaseAuthSocket(socket.handshake.auth.token);
    // if (!firebaseAuthSocket(socket.handshake.auth.token)) {
    //     console.log('has been disconnected ');
    //     socket.disconnect();
    // }
    // if (await !redisClient.hmget(socket.handshake.auth.token)) {
    //     const newUser: User = { user: authenticatedUser, userConnections: [socket.id] };
    //     redisClient.hmset(socket.handshake.auth.token, newUser);
    // }
    // const connections = JSON.parse((await redisClient.hget(socket.handshake.auth.token, CONNECTION)) as string);
    // redisClient.hmset(socket.handshake.auth.token, { CONNECTION: connections.push(socket.id) });
    // next();
    next();
});

io.on('connection', (socket: Socket) => {
    console.log('connection established');
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
