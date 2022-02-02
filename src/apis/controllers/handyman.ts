import {User,UserRole} from '../models/user'
import {Categories} from '../models/categories'
import {connection} from '../../settings/db'
import { InsertResult, Entity ,DeepPartial} from 'typeorm';
import {Handyman} from '../models/handyman'
export class HandymanController {
    constructor(){
        this.findHandyman = this.findHandyman.bind(this)
        this.createHandyman = this.createHandyman.bind(this)
        this.createHandymanByCategories = this.createHandymanByCategories.bind(this)
    }
    async createHandyman  (user: User ){
        const handymanRepo = connection.getRepository(Handyman)
        const createdHandyman = await handymanRepo.save({userId : user})
        return createdHandyman
    }
    async createHandymanByCategories (userId:string,selectedCategories : []){
        const handymanRepo = connection.getRepository(Handyman)
        let foundHandyman = await handymanRepo.findOne({where:{
            userId : userId
        }})
        if(foundHandyman){
            foundHandyman.professionals = [...selectedCategories]
            return await handymanRepo.save(foundHandyman)
        }
        return
    }
    async findHandyman() {
        const userRepo = connection.getRepository(User)
        return await userRepo.find({
            isHandyman : UserRole.HANDYMAN
        })
    }
    async findAllCategories(){
        const cateRepo = connection.getRepository(Categories)
        return await cateRepo.find()
    }
    async findHanymanByCategory(category: string){
        const cateRepo = connection.getRepository(Categories)
        return await cateRepo.find({
            where : {
                detial : category,
            },
            relations : ['handymans']
        })
    }
}