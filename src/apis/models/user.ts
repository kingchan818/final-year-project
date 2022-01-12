import {Entity, PrimaryColumn, Column, OneToOne,JoinColumn, OneToMany,ManyToMany,JoinTable, PrimaryGeneratedColumn} from "typeorm";
import {Categories} from './categories'
import { Task } from "./task";
import { Message } from "./messages";
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

    @Column({nullable: false, type: 'varchar', length: 200})
    username: string;

    @Column({nullable: false, type: 'text'})
    profilePic: string;

    @Column({ nullable: false,unique: true, type: 'varchar', length: 200 })
    email: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default : UserRole.CLIENT,
        nullable: false
    })
    isHandyman: UserRole;

    @OneToOne(() => Client, client => client.userId ,{onDelete:'CASCADE',onUpdate:'CASCADE'}) 
    @JoinColumn()
    client: Client;

    @OneToOne(() => Handyman, handyman => handyman.userId,{onDelete:'CASCADE',onUpdate:'CASCADE'}) 
    @JoinColumn()
    handyman: Handyman;

    @OneToMany(() => Message, message=>message.sender )
    sender: Message[];

    @OneToMany(()=>User, user=>user.sender)
    receiver : User[]
}





