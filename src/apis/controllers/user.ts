import {initializeApp} from 'firebase-admin'
import {Request,Response,NextFunction} from 'express'
const firebaseConfig = {
    apiKey: "AIzaSyAmJBY2OgoFM72owNv_nt81t7ofggf-vig",
    authDomain: "fyp-app-auth.firebaseapp.com",
    projectId: "fyp-app-auth",
    storageBucket: "fyp-app-auth.appspot.com",
    messagingSenderId: "877900468829",
    appId: "1:877900468829:web:e089b4e7e3a40a0511f3b4",
    measurementId: "G-HLTBMETELB"
  };

initializeApp(firebaseConfig)



const vertifyUser = (req:Request,res:Response,next:NextFunction)=>{

}