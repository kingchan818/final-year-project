import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'



@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToMany(()=>User, user=>user.messages)
    sender : User[]

    @ManyToMany(()=>User, user=>user.messages)
    receiver : User[]

    @Column({type:'text',nullable:false})
    detial : string

    @Column({type:'datetime', default: ()=>'CURRENT_TIMESTAMP'})
    createdAt : Date 
}