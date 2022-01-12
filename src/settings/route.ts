import { Application } from 'express'
import expressSession from 'express-session'
import { Server } from 'http'
import { websocket } from '../webSocket' 
export const route = (app:Application, httpServer : Server)=>{
    const sessionMiddleware = expressSession({
        secret : 'test',
        saveUninitialized: true,
    })
    websocket(httpServer)
    app.use(sessionMiddleware)
}
