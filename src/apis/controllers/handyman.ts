import {User,UserRole} from '../models/user'
import {connection} from '../../settings/db'
import { InsertResult } from 'typeorm';
export class Handyman {
    constructor(){
        this.findHandyman = this.findHandyman.bind(this)
    }
    async findHandyman() {
        const userRepo = connection.getRepository(User)
        return await userRepo.find({
            isHandyman : UserRole.HANDYMAN
        })
        
    }
}