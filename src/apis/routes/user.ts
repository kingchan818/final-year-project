import express,{Request,Response} from 'express'
import User from '../controllers/user'
import {AuthReturn, firebaseAuth} from '../../middlewares/auth'
const router = express.Router()



router.post('/vertify',firebaseAuth, async(req:Request<{},{},{role? : string},{}>,res:Response)=>{
    res.send('user vertified')
})

router.post('/createuser',firebaseAuth,async(req:Request,res:Response)=>{
    const name = res.locals.user.username
    const role = res.locals.user.role
    console.log('createROle',role)
    const newUser = new User()
    const user = await newUser.vertifyAndCreateUser(res.locals.user,name,role)
    return res.send(user).status(200)
})


export default router   