import {Entity, OneToOne,JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Task } from "./task";
import { User } from "./user";

@Entity()
export class Client {
    @PrimaryGeneratedColumn({name: 'id'})
    id : number

    @OneToOne(() => User,{cascade:true})
    @JoinColumn({name: 'userId' })
    userId: User;

    @OneToMany(() => Task, task => task.client,{onDelete:'CASCADE',onUpdate: 'CASCADE'})
    tasks: Task[]; 
}