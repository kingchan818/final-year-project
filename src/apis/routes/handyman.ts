import express,{Response,Request, NextFunction} from 'express'
import { firebaseAuth , AuthReturn} from '../../middlewares/auth'
import { Handyman } from '../controllers/handyman'
const router = express.Router()


router.get('/',(req:Request,res:Response)=>{
    res.send('yo test')
})
router.get('/findhandyman',async(req:Request,res:Response)=>{
    const handyman = new Handyman();
    const handymans = await handyman.findHandyman()
    console.log(handymans)
    res.send(handymans)
})

router.get('/handyman',firebaseAuth,(req:Request<{},{},{},AuthReturn>,res:Response,next:NextFunction)=>{
    res.send('hellow world')
})



export default router