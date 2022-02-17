import {Entity, PrimaryColumn, Column, OneToOne,JoinColumn, OneToMany,ManyToMany,JoinTable, PrimaryGeneratedColumn} from "typeorm";
import {Categories} from './categories'
import { Task } from "./task";
import { ChatRoom } from "./messages";
import { Client } from "./client";
import { Handyman } from "./handyman";

export enum UserRole {
    CLIENT = "client",
    HANDYMAN = "handyman",
}


@Entity()
export class User {
    @PrimaryColumn({nullable: false,unique:true,type: 'varchar', length: 200})
    id: string;

    @Column({nullable: false, type: 'varchar', length: 200, default : ''})
    username: string;

    @Column({nullable: true, type: 'text'})
    profilePic: string;

    @Column({ nullable: false,unique: true, type: 'varchar', length: 200 })
    email: string;


    @Column({type:'datetime', default: ()=>'CURRENT_TIMESTAMP'})
    createdAt : Date 

    @Column({
        type: "enum",
        enum: UserRole,
        default : UserRole.CLIENT,
        nullable: false
    })
    isHandyman: UserRole;

    @OneToOne(() => Client, client => client.userId ,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    client: Client;

    @OneToOne(() => Handyman, handyman => handyman.userId,{onDelete:'CASCADE',onUpdate:'CASCADE'}) 
    handyman: Handyman;

    @OneToMany(() => ChatRoom, chatRoom => chatRoom.client )
    clientChat: ChatRoom[];

    @OneToMany(() => ChatRoom, chatRoom => chatRoom.client )
    handymanChat: ChatRoom[];
}





