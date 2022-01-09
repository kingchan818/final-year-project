import {Entity,PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany,JoinColumn} from "typeorm";
import {Handyman} from './user'

@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({nullable: false, type:"varchar", length: 200})
    detial: string;

    @ManyToMany(()=>Handyman, handyman=> handyman.professionals)
    handymans: Handyman[]
}
