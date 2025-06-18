import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp} from "typeorm";

@Entity()
export default class FilteredExtension {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @CreateDateColumn()
    createdAt: Timestamp;

    constructor(name: string) {
        this.name = name;
    }
}