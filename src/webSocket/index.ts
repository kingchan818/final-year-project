import { Socket , Server} from 'socket.io';
import {firebaseAuthSocket,roleAuthSocket} from '../middlewares/auth'
import {getRepository} from 'typeorm'
import { User } from '../apis/models/user';
export const websocket = (httpServer: any|object)=>{
    const io = new Server(httpServer, { 
        cors: { origin : "*"}
     });
    interface sendMessageResponse {
        reciverId: string,
        content:string
    }
    interface ResponseData extends Socket{
        userId?: string,
        idToken?: string
    }
    
    io.use(async(socket : ResponseData, next)=>{
        const idToken : string = socket.handshake.auth.idToken
        const vertified = await firebaseAuthSocket(idToken)
        const role = await roleAuthSocket(vertified)
        if(!vertified && !role){
            throw new Error('unauthorized')
        }else{
            socket.userId = vertified
            socket.idToken = idToken
        }
        next();
    })

    io.on('connection',async(socket: ResponseData)=>{
        console.log('a user connected')
        socket.emit('vertify',{
            userId : socket.userId,
            idToken : socket.idToken
        })

        socket.join(socket.userId!);

        // fetch existing users
        const userRepo = getRepository(User)
        const users = await userRepo.find()
        socket.emit('users',users)

         // notify existing users
        socket.broadcast.emit("user connected", {
            userId : socket.userId,
            connected: true,
        });

        // forward the private message to the right recipient (and to other tabs of the sender)
        socket.on('private-message',({reciverId,content} :sendMessageResponse )=>{
            socket.to(reciverId).to(socket.userId!).emit('private-message',{
                content,
                from: socket.userId,
                reciverId,
            })
        })

        socket.on('disconnect',async()=>{
            const matchingSockets = await io.in(socket.userId!).allSockets();
            const isDisconnected = matchingSockets.size === 0;
            if(isDisconnected){
                socket.broadcast.emit(' user disconnected',socket.userId);
            }
        })


    })
   
}
