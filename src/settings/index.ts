import express,{Application} from 'express';
import { createServer } from 'http';
import {websocket} from '../webSocket'
import {initDB} from './db'
import * as dotenv from 'dotenv'
dotenv.config()
const app : Application = express()
const httpServer = createServer(app);
initDB()
// websocket(httpServer)
httpServer.listen(process.env.PORT,()=>{
    console.log('listening to port',process.env.PORT)
});
