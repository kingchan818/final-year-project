import { Application, Request,Response } from 'express'
import expressSession from 'express-session'
import { Server } from 'http'
import main from '../apis/routes'
import { websocket } from '../webSocket' 
import cors from 'cors'
export const route = (app:Application, httpServer : Server)=>{
    const sessionMiddleware = expressSession({
        secret : 'test',
        saveUninitialized: true,
    })
    app.use(cors({
        origin : '*'
    }))
    app.use('/test',(req :Request,res : Response)=>{
        res.json({'message':'hello world!'})
    })
    websocket(httpServer)
    app.use(sessionMiddleware)
    main(app)
}
