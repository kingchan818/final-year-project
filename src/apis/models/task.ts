import {Entity,PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Handyman,Client} from './user'

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({nullable: false, type:"text"})
    detial: string;

    @Column({nullable: false,type:'boolean',default:false})
    isFinish: boolean

    @ManyToOne(()=>Handyman, handyman=> handyman.taskTaken )
    handyman: Handyman

    @ManyToOne(()=>Client, clients=> clients.taskTaken )
    client: Client

}
