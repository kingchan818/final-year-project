import express,{Application} from 'express';
import { createServer } from 'http';
import * as admin from 'firebase-admin'
import {websocket} from '../webSocket'
import {initDB} from './db'
import * as dotenv from 'dotenv'
import {route} from './route'

dotenv.config()
const app : Application = express()
const httpServer = createServer(app);
initDB()
const firebaseConfig = {
    apiKey: "AIzaSyAmJBY2OgoFM72owNv_nt81t7ofggf-vig",
    authDomain: "fyp-app-auth.firebaseapp.com",
    projectId: "fyp-app-auth",
    storageBucket: "fyp-app-auth.appspot.com",
    messagingSenderId: "877900468829",
    appId: "1:877900468829:web:e089b4e7e3a40a0511f3b4",
    measurementId: "G-HLTBMETELB"
  };
admin.initializeApp(firebaseConfig)
route(app,httpServer)
httpServer.listen(process.env.PORT,()=>{
    console.log('listening to port',process.env.PORT)
});
