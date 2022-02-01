import express,{Response,Request, NextFunction} from 'express'
import { firebaseAuth , AuthReturn} from '../../middlewares/auth'
import { HandymanController } from '../controllers/handyman'
const router = express.Router()


router.get('/',(req:Request,res:Response)=>{
    res.send('yo test')
})
router.get('/findhandyman',async(req:Request,res:Response)=>{
    const handyman = new HandymanController();
    const handymans = await handyman.findHandyman()
    console.log(handymans)
    res.send(handymans)
})
// querying handyman by category -- > show the top ranking of handyman
router.get('/findhandyman/:category',async (req:Request<{category: string}>,res:Response)=>{
    const handyman = new HandymanController();
    const handymans = await handyman.findHanymanByCategory(req.params.category)
    res.json(handymans)
})

router.get('/handyman',firebaseAuth,(req:Request<{},{},{},AuthReturn>,res:Response,next:NextFunction)=>{
    res.send('hellow world')
})



export default router