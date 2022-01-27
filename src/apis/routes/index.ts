import {Application} from 'express'
import handymanRoute from './handyman'
import userRoute from './user'
import messageRoute from './message'
export const main = (app:Application)=>{
    app.use('/handyman',handymanRoute)
    app.use('/user',userRoute)
    app.use('/message',messageRoute)
}



export default main