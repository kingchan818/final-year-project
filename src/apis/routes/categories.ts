import {Categories} from '../models/categories';
import express,{Request,Response} from 'express'
import {connection} from '../../settings/db'
import { Handyman } from '../models/handyman';
import { User } from '../models/user';
import { In } from 'typeorm';
const router = express.Router()


router.get('/',async(req:Request,res:Response)=>{
    const catRepo =connection.getRepository(Categories)
    const categories = await catRepo.find({})
    res.send(categories)
})

router.get('/handymans/:category',async(req:Request,res:Response)=>{
    const category: string = req.params.category as string 
    const catRepo =connection.getRepository(Categories)
    const result = await connection.getRepository(Handyman)
    .createQueryBuilder('handyman')
    .leftJoinAndSelect('handyman.professionals', 'professionals')
    .select(['handyman.id','handyman.uid','professionals.detial'])
    .where('professionals.detial = :category', {category})
    .getMany()
    console.log(result)

    const handymanIds = result.map(handyman=>handyman.id)
    console.log(handymanIds)
    const handymanRepo = connection.getRepository(Handyman)
    const handymansDetial =await handymanRepo.find({
        where : {
            id : In(handymanIds)
        },
        relations : ['userId']
    })
    res.send(handymansDetial)
})








export default router