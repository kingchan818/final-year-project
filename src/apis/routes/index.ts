import {Application, Request, Response, NextFunction} from 'express'
import handymanRoute from './handyman'
import userRoute from './user'
import messageRoute from './message'
export const main = (app:Application)=>{
    app.use('/handyman',handymanRoute)
    app.use('/user',userRoute)
    app.use('/message',messageRoute)
    app.get('/',(req: Request,res: Response ,next: NextFunction)=>{
        res.send('Hello World')
        next()
    })
}



export default main