import {connection} from '../../settings/db'
import {User} from '../models/user'
import {Client} from '../models/client'
export class ClientController {
    constructor(){
        this.createClient = this.createClient.bind(this)
    }
    async createClient (user: User ){
        const clientRepo = connection.getRepository(Client)
        console.log('create client User',user)
        const createdClient = await clientRepo.save({userId : user})
        console.log(createdClient)
        return createdClient
    }
}