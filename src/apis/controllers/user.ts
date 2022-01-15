import {Request,Response,NextFunction} from 'express'
import { getRepository } from 'typeorm';
import {connection} from '../../settings/db'
import {User} from '../models/user'
export const vertify_and_create_user = async (user:{uid:string, email: string, username: string},name:string) => {
    const userRepo =  connection.getRepository(User)
    const found_user = await userRepo.findOne({
        id: user.uid
    })
    console.log(found_user);
    if (!found_user) {
        const createdUser = await userRepo.insert({
            id : user.uid,
            email : user.email,
            username : name
        })
        console.log('new user' + createdUser);
        return createdUser;
    }
    return found_user;
};
