import express,{Request,Response} from 'express'
import User from '../controllers/user'
import {AuthReturn, firebaseAuth} from '../../middlewares/auth'
import UserController from '../controllers/user'
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
// clientUserId handymanId
// query all the tasks of the user and handyman
router.get('/tasks/clientid/handymanid',async(req:Request,res:Response)=>{
    const clientUserId = req.body.clientUserId;
    const handymanUserId = req.body.handymanUserId;
    const userController = new UserController();
    const tasksAndHandymanAndClient  = await userController.showWhichTasksChargedByHandyman(clientUserId,handymanUserId)
    return res.send(tasksAndHandymanAndClient).status(200)
})

// clientId
// query all the tasks of the user
// return the handyman who charges these task
router.get('/tasks/clientid',async(req:Request,res:Response)=>{
    const clientUserId = req.body.clientUserId;

    const userController = new UserController();
    const task = await userController.getAllHandymanTasksByClientId(clientUserId);
    return res.send(task).status(200)
})


export default router   