import { Socket , Server} from 'socket.io';
import {firebaseAuthSocket,roleAuthSocket} from '../middlewares/auth'
import { connection } from '../settings/db';
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
        const idToken : string = socket.handshake.auth.token
        const vertified = await firebaseAuthSocket(idToken)
        console.log(vertified)
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

        // console.log('that is the UserId' ,socket.userId)

        socket.join(socket.userId!);

        socket.emit('vertify',{
            userId : socket.userId,
            idToken : socket.idToken
        })


         // notify existing users
        socket.broadcast.emit("user-connected", {
            userId : socket.userId,
            connected: true,
        });
        //user
        socket.on('send-message',async(message:{content:string, toUserId:string})=>{
            const userRepo = connection.getRepository(User)
            const findUser = await userRepo.findOne({id:message.toUserId})
            const sendUser = await userRepo.findOne({id:socket.userId})
            if(findUser){
                console.log('send-message triggered', findUser)

                socket.to(message.toUserId).emit('recive-message',{
                    from : socket.userId,
                    fromUserName : sendUser?.username,
                    content:message.content,
                    to : message.toUserId
                })
            }
        })

        // forward the private message to the right recipient (and to other tabs of the sender)
        // socket.on('private-message',({reciverId,content} :sendMessageResponse )=>{
        //     socket.to(reciverId).to(socket.userId!).emit('private-message',{
        //         content,
        //         from: socket.userId,
        //         reciverId,
        //     })
        // })


        socket.on('disconnect',async()=>{
            const matchingSockets = await io.in(socket.userId!).allSockets();
            const isDisconnected = matchingSockets.size === 0;
            if(isDisconnected){
                socket.broadcast.emit(' user disconnected',socket.userId);
            }
        })


    })
   
}
