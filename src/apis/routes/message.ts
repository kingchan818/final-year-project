import express,{Response,Request, NextFunction} from 'express'
import { firebaseAuth , AuthReturn,roleAuth} from '../../middlewares/auth'
import { UserRole,User } from '../models/user'
import {connection} from '../../settings/db'
import {ChatRoom} from '../models/messages'
const router = express.Router()



router.post('/createchat',firebaseAuth,async(req:Request,res:Response) => {
    const userId :string =req.query.clientid as string
    const hanymanId :string = req.query.handymanid as string
    const taskName : string = req.query.taskName as string
    const chatRoomRepo = connection.getRepository(ChatRoom)
    const userRepo = connection.getRepository(User)
    console.log('handyman ids',hanymanId)
    const client = await userRepo.findOne({
        id : userId
    })
    const handyman = await userRepo.findOne({
        id : hanymanId
    })
    console.log(handyman , client)
    console.log('taskNameasdasdasdasdasdasdas',taskName)
    const foundRoom =await chatRoomRepo.findOne({
        relations : ['client', 'handyman'],
        where : {
            client : client?.id,
            handyman : handyman?.id,
            taskName : taskName,
        }
    })
    if (!foundRoom) {
        if (client?.isHandyman === UserRole.CLIENT && handyman?.isHandyman === UserRole.HANDYMAN){
            const newChatRoom = new ChatRoom()
            newChatRoom.handyman = handyman
            newChatRoom.client = client
            newChatRoom.taskName = taskName
            const room = await connection.manager.save(newChatRoom)
            console.log('should return room enentity',room)
            console.log('should return room id',room.id)
            return res.status(200).json(room.id)
        }
        throw new Error('wrong relationship')
    }
    return res.status(400).json(foundRoom.id)

})


router.get('/findroom',firebaseAuth,async(req:Request,res:Response) => {
    const userId :string =req.query.clientid as string
    const chatRoomRepo = connection.getRepository(ChatRoom)
    
    const foundRoom =await chatRoomRepo.find({
        relations : ['client'],
        where : {client : userId}
    })
    res.send(foundRoom)
})

export default router