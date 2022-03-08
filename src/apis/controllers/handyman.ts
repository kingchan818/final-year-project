import {User,UserRole} from '../models/user'
import {Categories} from '../models/categories'
import {connection} from '../../settings/db'
import { InsertResult, Entity ,DeepPartial} from 'typeorm';
import {Handyman} from '../models/handyman'
import {Task} from '../models/task'
import {Client} from '../models/client'
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

    async findAllCommentAboutThisHandyman(id : string){
        const handymanRepo = connection.getRepository(Handyman)
        const taskRepo = connection.getRepository(Task)
        const targetHandyman = await handymanRepo.findOne({
            where : {
                userId : id
            }
        })
        const tasks = await taskRepo.find({
            where : { handyman : targetHandyman!.id, isFinish : true }
        })
        return tasks;
    }

    async finishedTask(userId:string,isFinished:any,rate:number,detial:string, handymanInfoId:string){
        const clientRepo = connection.getRepository(Client)
        const handymanRepo = connection.getRepository(Handyman)
        const taskRepo = connection.getRepository(Task)
        const client = await clientRepo.findOne({where : {userId : userId}})
        const handyman = await handymanRepo.findOne({where : {userId : handymanInfoId}})
        if(!client || !handyman){
            throw new Error('Can not found the client or handyman')
        }
        const task = new Task()
        task.client = client!
        task.handyman = handyman!
        task.isFinish = JSON.parse(isFinished!)
        task.rate = rate!
        task.detial = detial!
        const result = await taskRepo.save(task)
        return result        
    }
    async alterHandymanRatingByTaskId(taskId : number , rating : number){
        const taskRepo = connection.getRepository(Task);

        const task = await taskRepo.findOne({
            where : {
                id : taskId
            }
        })
        task!.rate = rating
        const savedTask = await taskRepo.save(task!)
        return savedTask;
    }
}

