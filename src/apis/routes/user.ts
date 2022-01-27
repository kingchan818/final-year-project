import express,{Request,Response} from 'express'
import User from '../controllers/user'
import {AuthReturn, firebaseAuth} from '../../middlewares/auth'
const router = express.Router()



router.post('/vertify',firebaseAuth, async(req:Request<{},{},{},AuthReturn>,res:Response)=>{
    const newUser = new User()
    const name = res.locals.user_g.name
    const user = await newUser.vertifyAndCreateUser(res.locals.user,name)
    res.send(user).status(200)
})






export default router   