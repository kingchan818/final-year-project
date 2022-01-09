import {Entity, PrimaryColumn, Column, OneToOne,JoinColumn, OneToMany,ManyToMany,JoinTable, PrimaryGeneratedColumn} from "typeorm";
import {Categories} from './categories'
import { Task } from "./task";
import { Message } from "./messages";

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

    @OneToOne(() => Client, client => client.userId ,{onDelete:'CASCADE',onUpdate:'CASCADE'}) // specify inverse side as a second parameter
    @JoinColumn()
    client: Client;

    @OneToOne(() => Handyman, handyman => handyman.userId,{onDelete:'CASCADE',onUpdate:'CASCADE'}) // specify inverse side as a second parameter
    @JoinColumn()
    handyman: Handyman;

    @ManyToMany(() => Message, message=>message.sender )
    @JoinTable({
        name: "conversation_of_users", // table name for the junction table of this relation
        joinColumn: {
            name: "message",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "user",
            referencedColumnName: "id"
        }
    })
    messages: Message[];
}


@Entity()
export class Handyman {
    @PrimaryGeneratedColumn({name: 'id'})
    id : number

    @OneToOne(() => User,{cascade:true})
    @JoinColumn({name: 'userId' })
    userId: User;

    @ManyToMany(() => Categories, catagories=>catagories.handymans )
    @JoinTable({
        name: "Handyman_in_which_category", // table name for the junction table of this relation
        joinColumn: {
            name: "category",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "handyman",
            referencedColumnName: "id"
        }
    })
    professionals: Categories[];

    @OneToMany(() => Task, task => task.handyman,{onDelete:'CASCADE',onUpdate: 'CASCADE'})
    tasks: Task[];
}

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