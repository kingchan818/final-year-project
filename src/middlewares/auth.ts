import e, {Request,Response,NextFunction} from 'express'
import firebaseAdmin from 'firebase-admin'
import {User,UserRole} from '../apis/models/user'
import {getRepository} from 'typeorm'
import { connection } from '../settings/db'
export interface AuthReturn {
    user : string,
    idToken: string
}

export const firebaseAuth = async (req:Request<{},{},{},AuthReturn>, res:Response, next:NextFunction) => {
    const {user,idToken} = req.query
    if (user === undefined) return res.status(401).send(' user is undefined ');
    try {
        const userJ : object = JSON.parse(user);
        const userInfoFromGoogle = await firebaseAdmin.auth().verifyIdToken(idToken);
        res.locals.user  = userJ;
        res.locals.user_g = userInfoFromGoogle
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
