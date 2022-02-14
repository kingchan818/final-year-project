import {Entity, OneToOne,JoinColumn, OneToMany,ManyToMany,JoinTable, PrimaryGeneratedColumn} from "typeorm";
import { Categories } from "./categories";
import { Task } from "./task";
import { User } from "./user";

@Entity()
export class Handyman {
    @PrimaryGeneratedColumn({name: 'id'})
    id : number

    @OneToOne(() => User,{cascade:true})
    @JoinColumn({name: 'uid' })
    userId: User;

    @ManyToMany(() => Categories, catagories=>catagories.handymans)
    @JoinTable({
        name: "Handyman_in_which_category", 
        joinColumn: {
            name: "handyman",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "category",
            referencedColumnName: "id"
        }
    })
    professionals: Categories[];

    @OneToMany(() => Task, task => task.handyman,{onDelete:'CASCADE',onUpdate: 'CASCADE'})
    tasks: Task[];
}

