import express,{Application} from 'express';
import { createServer } from 'http';
import {websocket} from '../webSocket'
import {initDB} from './db'
const app : Application = express()
initDB()
const httpServer = createServer(app);
// websocket(httpServer)
httpServer.listen(5000,()=>{
    console.log('listening to port 5000')
});
