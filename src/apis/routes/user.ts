import express,{Request,Response} from 'express'
import {vertify_and_create_user} from '../controllers/user'
import {AuthReturn, firebaseAuth} from '../../middlewares/auth'
const router = express.Router()



router.post('/vertify',firebaseAuth, async(req:Request<{},{},{},AuthReturn>,res:Response)=>{
    const name = res.locals.user_g.name
    console.log(name)
    const user = await vertify_and_create_user(res.locals.user,name)
    console.log('called vertify route',user)
    res.send(user).status(200)
})






export default router   