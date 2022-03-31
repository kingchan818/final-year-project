import express,{Application} from 'express';
import { createServer } from 'http';
import * as admin  from 'firebase-admin'
import {websocket} from '../webSocket'
import {initDB} from './db'
import * as dotenv from 'dotenv'
import {route} from './route'
import config from 'config'

dotenv.config()
const app : Application = express()
const httpServer = createServer(app)
initDB()
const firebaseConfig = config.get<admin.AppOptions>('firebase')
admin.initializeApp(firebaseConfig)
route(app,httpServer)
httpServer.listen(process.env.PORT,()=>{
    console.log('listening to port',process.env.PORT)
});
