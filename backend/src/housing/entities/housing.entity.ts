import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm";
import { HousingImg } from "./housingImg.entity";
import { Customer } from "src/customers/entities/customer.entity";

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

    @OneToMany(() => HousingImg, (housingImg: HousingImg) => housingImg.house, { onDelete: "CASCADE" })
    photos: HousingImg[];

    @ManyToMany(() => Customer, (customer: Customer) => customer.id, { onDelete: "CASCADE" })
    hasLiked?: Array<Customer>;
}
