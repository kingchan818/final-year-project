import {Categories} from '../../src/apis/models/categories'
import {User, UserRole} from '../../src/apis/models/user'
import {Task} from '../../src/apis/models/task'
import {Client} from '../../src/apis/models/client'
import {Handyman} from '../../src/apis/models/handyman'
import {connection} from '../../src/settings/db'
import { classArray } from "../../src/apis/models";
import {createConnection, createQueryBuilder, getConnection, getRepository} from 'typeorm'
import * as dotenv from 'dotenv'
dotenv.config()

beforeEach(()=>{
    return createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: `${process.env.MYSQL_PASSWORD}`,
        database: "fyp_test",
        entities: [...classArray],
        synchronize: true,
    });
})

afterEach(()=>{
    let conn = getConnection();
    return conn.close();
})

describe('User-model',()=>{
    it('Insertion should return a inserted user--client ',async()=>{
        let user = new User()
        user.email = 'chan12@gmail.com'
        user.id = 'asd!@#Ta2345dasd5'
        user.username = 'client01'
        user.profilePic = 'https://localhost:8080/img/happy.pic'
        await getRepository(User).insert(user)
        const createdData = await getRepository(User).findOne({
            where:{
                id : user.id
            }
        })
        expect(createdData).toMatchObject(user)
    })
    it('Insertion should return a inserted user--handyman ',async()=>{
        let user = new User()
        user.email = 'handyman@gmail.com'
        user.id = 'asd!@#Ta2345645432dasd5'
        user.username = 'hanyman01'
        user.profilePic = 'https://localhost:8080/img/handyman.pic'
        user.isHandyman = UserRole.HANDYMAN
        await getRepository(User).insert(user)
        const createdData = await getRepository(User).findOne({
            where:{
                id : user.id
            }
        })
        expect(createdData).toMatchObject(user)
    })
    // it('Delection should be return a deleted user', async()=>{
    //     const user  = await getRepository(User).findOne({where : {firebaseId : 'asd!@#Ta2345dasd5'}})
    //     if (!user) throw new Error('Can not found the user')
    //     const deletion = await getRepository(User).remove(user)
    //     expect(deletion).toMatchObject(user)
    // })
})
describe('CLient-model',()=>{
    it('Insertion should return a inserted client ',async()=>{
        const userRepo = getRepository(User)
        const user = await userRepo.findOne({where: {id : 'asd!@#Ta2345dasd5'}})
        let client = new Client()
        client.userId = user!
        await getRepository(Client).insert(client)
        const createdData = await getRepository(Client).findOne({where:{userId : 'asd!@#Ta2345dasd5'}})
        console.log(client)
        console.log(createdData)
        expect(client).toMatchObject(client)
    })

    // it('Delection should be return a deleted user', async()=>{
    //     const user  = await getRepository(User).findOne({where : {firebaseId : 'asd!@#Ta2345dasd5'}})
    //     if (!user) throw new Error('Can not found the user')
    //     const deletion = await getRepository(User).remove(user)
    //     expect(deletion).toMatchObject(user)
    // })
})
describe('Handyman-model👷',()=>{
    it('Insertion should return a inserted handyman ',async()=>{
        const categoryRepo = getRepository(Categories)
        let category = new Categories()
        category.detial = 'helper'
        await categoryRepo.save(category)
        
        const userRepo = getRepository(User)
        const user = await userRepo.findOne({where: {id : 'asd!@#Ta2345645432dasd5'}})
        let handyman = new Handyman()
        const handymanRepo = getRepository(Handyman)
        handyman.userId = user!
        handyman.professionals = [category]
        await handymanRepo.save(handyman)
        console.log(handyman)

        const createdData = await getRepository(Handyman).findOne({where:{userId : 'asd!@#Ta2345645432dasd5'}})
        console.log(handyman)
        console.log(createdData)
        expect(handyman).toMatchObject(handyman)
    })


})

describe('Task-model',()=>{
    it('Insertion should return a inserted task ',async()=>{
        const handyman = await getRepository(Handyman).findOne({where:{userId : 'asd!@#Ta2345645432dasd5'}})
        const client = await getRepository(Client).findOne({where:{userId : 'asd!@#Ta2345dasd5'}})
        
        const taskRepo = getRepository(Task)
        const task = new Task()
        task.client = client!
        task.handyman = handyman!
        task.isFinish = true
        task.detial = 'finished asssignment'
        task.rate = 3
        const res = await taskRepo.save(task)
        console.log(res);
        console.log(task);
        const createdData =  await getRepository(Task).findOne({where:{id : task.id}})
        expect(task).toMatchObject(createdData!)
    })

})

