import {Request,Response,NextFunction} from 'express'
import { getRepository,InsertResult } from 'typeorm';
import {connection} from '../../settings/db'
import {User} from '../models/user'

export default class UserController {

    constructor(){
        this.vertifyAndCreateUser = this.vertifyAndCreateUser.bind(this)
    }

    async vertifyAndCreateUser (user:{uid:string, email: string, username: string, photoURL : string},name:string) : Promise<User | InsertResult> {
        const userRepo =  connection.getRepository(User)
        const found_user = await userRepo.findOne({
            id: user.uid
        })
        if (!found_user) {
            const createdUser = await userRepo.insert({
                id : user.uid,
                email : user.email,
                username : name,
                profilePic : user.photoURL
            })
            console.log('new user' + createdUser);
            return createdUser;
        }
        
        return found_user;
    }

}


