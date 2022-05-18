import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Housing {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    ownerName: string;

    @Column({ default: "House" })
    type: string;

    @Column({ default: 1 })
    nbRoom: number;

    @Column({ default: 1 })
    area: number;

    @Column({ default: "Unused" })
    state: string;

    @Column({ default: 1 })
    price: number;

    @Column()
    date: Date;

    @Column({ default: "Paris" })
    city: string;

    @Column({ default: 0 })
    nbParking: number;

    @Column()
    desc: string;

    @Column({ type: "varchar", array: true, default: [] })
    tags: string[];

    @Column({ type: "text", array: true, default: [], nullable: false })
    photos: string[];
}
