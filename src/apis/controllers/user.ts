import {Request,Response,NextFunction} from 'express'
import { getRepository,InsertResult } from 'typeorm';
import {connection} from '../../settings/db'
import {User, UserRole} from '../models/user'
import { ClientController } from './client';
import { HandymanController } from './handyman';


interface UserReqInterface {
    uid:string, 
    email: string, 
    username: string,
    photoURL : string
}
export default class UserController {
    handyman = new HandymanController();
    client = new ClientController();
    constructor(){
        this.vertifyAndCreateUser = this.vertifyAndCreateUser.bind(this)
        this.createUser = this.createUser.bind(this)
        this.updateUser = this.updateUser.bind(this)
    }

    private async createUser (user:UserReqInterface,name:string,role:UserRole){
        const userRepo =  connection.getRepository(User)
        console.log(name)
        const createdUser = await userRepo.save({
            id : user.uid,
            email : user.email,
            username : name,
            profilePic : user.photoURL,
            isHandyman : role
        })
        console.log(`new user is ${role}` + createdUser);
        return createdUser;
    }
    private async updateUser (user:UserReqInterface,name:string){
        if(name)
            return await connection.createQueryBuilder()
                .update(User)
                .set({username : name})
                .where("id = :id",{id: user.uid})
                .execute()
    }

    async vertifyAndCreateUser (user : UserReqInterface,name:string,role? : string)  {
        const userRepo =  connection.getRepository(User)
        const found_user = await userRepo.findOne({
            id: user.uid
        })
        if (found_user === undefined || found_user === null) {
            if(role === undefined){
                console.log('No user role',role)
                const createdUser = await this.createUser(user,name,UserRole.CLIENT)
                console.log('created User',createdUser)
                const createClient = await this.client.createClient(createdUser)
                console.log(createClient)
                return createdUser;
            }
            else if(role === 'handyman'){
                console.log('triggle hanyman')
                const createdUser = await this.createUser(user,name,UserRole.HANDYMAN)
                const createHanyman = await this.handyman.createHandyman(createdUser)
                console.log(createHanyman)
                return createdUser;
            }
            else if(role === 'client'){
                console.log('triggle client')
                const createdUser = await this.createUser(user,name,UserRole.CLIENT)
                const createClient = await this.client.createClient(createdUser)
                console.log(createClient)
                return createdUser;
            }
        }else{
            this.updateUser(user,name)
            return found_user;
        }
    }

}


