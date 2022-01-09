import {Entity,PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {Handyman,Client, User} from './user'

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({nullable: false, type:"text"})
    detial: string;

    @Column({nullable: false,type:'boolean',default:false})
    isFinish: boolean

    @ManyToOne(() => Handyman, handyman=> handyman.tasks )
    @JoinColumn({name:'handyman_user_id'})
    handyman: Handyman

    @ManyToOne(() => Client, client=> client.tasks )
    @JoinColumn({name:'client_user_id'})
    client: Client

}
