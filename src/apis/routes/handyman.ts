import express,{Response,Request, NextFunction} from 'express'
import { firebaseAuth , AuthReturn} from '../../middlewares/auth'
const router = express.Router()


router.get('/',(req:Request,res:Response)=>{
    res.send('yo test')
})

router.get('/handyman',firebaseAuth,(req:Request<{},{},{},AuthReturn>,res:Response,next:NextFunction)=>{
    res.send('hellow world')
})



export default router