import e, {Request,Response,NextFunction} from 'express'
import firebaseAdmin from 'firebase-admin'
import {User,UserRole} from '../apis/models/user'
import {getRepository} from 'typeorm'
import { connection } from '../settings/db'
import UserController from '../apis/controllers/user'
export interface AuthReturn {
    user : string,
    idToken: string
}


export const userBaseAuth = async (req:Request,res:Response ,next:NextFunction)=>{
    const { user , user_g , id_token}  = res.locals
    if(!user && !user_g){
        return res.sendStatus(401)
    }
    const userController = new UserController()
    const userId = user.uid as string
    const userRole = UserRole.CLIENT
    const userDetial = await userController.findUser(userId)
    if(!userDetial){
        const newUser = await userController.createUser(user,user.username,userRole)
        return res.send(newUser).status(200)
    }
    next()
}


export const firebaseAuth = async (req:Request<{},{},{},any>, res:Response, next:NextFunction) => {
    const {user,idToken} = req.query
    if (user === undefined) return res.status(401).send(' user is undefined ');
    try {
        const userJ : object = JSON.parse(user);
        const userInfoFromGoogle = await firebaseAdmin.auth().verifyIdToken(idToken);
        console.log(userInfoFromGoogle)
        res.locals.user  = userJ;
        res.locals.user_g = userInfoFromGoogle
        res.locals.id_token = idToken
        console.log(res.locals)
        next();
    } catch (e) {
        res.status(401).send('user is not vertified, please signUp a SSO');
    }
};

export const roleAuth = async (req:Request, res:Response, next:NextFunction) => {
    const userRepo = connection.getRepository(User)
    const user = await userRepo.findOne({id:res.locals.user.uid})
    if(!user) throw new Error('user is not defined')
    if (user?.isHandyman === UserRole.CLIENT){
        res.locals.user.role = UserRole.CLIENT
        next();
    }
    res.locals.user.role = UserRole.HANDYMAN
    next();
};

export const firebaseAuthSocket = async (idToken:string) => {
    try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
        return decodedToken.uid
    } catch (e:any) {
        throw new Error(`${e}`);
    }
};

export const roleAuthSocket = async (decodedToken:string) => {
    const userRepo = connection.getRepository(User)
    const user = await userRepo.findOne({id:decodedToken})
    if(!user) throw new Error('user is not defined')
    if (user?.isHandyman === UserRole.CLIENT){
        return UserRole.CLIENT
    }
    return UserRole.HANDYMAN
};
