import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'



@Entity()
export class ChatRoom {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(()=> User, user=>user.clientChat)
    client : User

    @ManyToOne(()=> User, user=>user.handymanChat)
    handyman : User

    @Column({type: "varchar", length: 255, nullable: false})
    taskName : string

    @Column({type:'datetime', default: ()=>'CURRENT_TIMESTAMP'})
    createdAt : Date 
}