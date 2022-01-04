import { Socket , Server} from 'socket.io';

export const websocket = (httpServer: any|object)=>{
    const io = new Server(httpServer, { 
        cors: { origin : "*"}
     });
    interface sendMessageResponse {
        userId:string,
        reciverId: string,
        message:string
    }
    io.on('connection',(socket)=>{
        console.log('a user connected')
        const id = <string>socket.handshake.query.id
        socket.join(id)
        socket.on('send-message',({userId,reciverId,message} :sendMessageResponse )=>{
        })
    })
    
}
