import {Entity, PrimaryColumn, Column, OneToOne,JoinColumn, OneToMany,ManyToMany,JoinTable} from "typeorm";
import {Categories} from './categories'
import { Task } from "./task";
export enum UserRole {
    CLIENT = "client",
    HANDYMAN = "handyman",
}

@Entity()
export class User {
    @PrimaryColumn({nullable: false,unique:true,type: 'varchar', length: 200})
    firebaseId: string;

    @Column({nullable: false, type: 'varchar', length: 200})
    username: string;

    @Column({nullable: false, type: 'text'})
    profilePic: string;

    @Column({ nullable: false,unique: true, type: 'varchar', length: 200})
    email: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default : UserRole.CLIENT,
        nullable: false
    })
    isHandyman: UserRole;
}


@Entity()
export class Handyman {
    @OneToOne(() => User,{primary:true,cascade:true})
    @JoinColumn()
    id: User;

    @ManyToMany(() => Categories, catagories=>catagories.handymans ,{onDelete:'CASCADE',cascade: true})
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

    @OneToMany(() => Task, task => task.handyman,{onDelete:'CASCADE',cascade: true})
    taskTaken: Task[];

    
}

@Entity()
export class Client {
    @OneToOne(() => User,{primary:true,cascade:true})
    @JoinColumn()
    id: User;

    @OneToMany(() => Task, task => task.client,{onDelete:'CASCADE',cascade: true})
    taskTaken: Task[]; 
}