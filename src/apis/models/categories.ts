import {Entity,PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany,JoinColumn} from "typeorm";

import {Handyman} from './handyman'

@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    id: string;
    
    @Column({nullable: false, type:"varchar", length: 200, unique: true})
    detial: string;

    @ManyToMany(()=>Handyman, handyman=> handyman.professionals)
    handymans: Handyman[]
}