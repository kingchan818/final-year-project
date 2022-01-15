import {Application} from 'express'
import handymanRoute from './handyman'
import UserRoute from './user'

export const main = (app:Application)=>{
    app.use('/handyman',handymanRoute)
    app.use('/user',UserRoute)
}



export default main