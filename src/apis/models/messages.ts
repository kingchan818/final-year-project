import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'



@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(()=> User, user=>user.sender)
    sender : User[]

    @ManyToOne(()=> User, user=>user.receiver)
    receiver : User[]

    @Column({type:'text',nullable:false})
    detial : string

    @Column({type:'datetime', default: ()=>'CURRENT_TIMESTAMP'})
    createdAt : Date 

}