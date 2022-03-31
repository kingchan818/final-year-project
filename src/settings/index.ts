import express,{Application} from 'express';
import { createServer } from 'http';
import * as admin  from 'firebase-admin'
import {initDB} from './db'
import * as dotenv from 'dotenv'
import {route} from './route'

dotenv.config()
const app : Application = express()
const httpServer = createServer(app)
initDB()
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket : process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId : process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId : process.env.FIREBASE_APP_ID,
    measurementId : process.env.FIREBASE_MEASUREMENT_ID
}
admin.initializeApp(firebaseConfig)
route(app,httpServer)
httpServer.listen(process.env.PORT,()=>{
    console.log('listening to port',process.env.PORT)
});
