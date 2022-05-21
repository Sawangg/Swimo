import { Exclude } from "class-transformer";
import { Housing } from "src/housing/entities/housing.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "nom", nullable: false })
    nom: string;

    @Column({ name: "prenom", nullable: false })
    prenom: string;

    @Column({ name: "login", nullable: false })
    login: string;

    @Column({ name: "password", nullable: false })
    password: string;

    @Column({ name: "avatar", type: "text", nullable: true })
    avatar?: string;

    @ManyToMany(() => Housing, (housing: Housing) => housing.id, { nullable: true, onDelete: "CASCADE" })
    @JoinTable({ name: "likes" })
    likes?: Housing[];

    @OneToMany(() => Housing, housing => housing.owner, { nullable: true, onDelete: "CASCADE" })
    owns?: Housing[];
}

export class SerializedCustomer {
    id: number;
    nom: string;
    prenom: string;
    login: string;

    @Exclude()
    password: string;

    constructor(partial: Partial<SerializedCustomer>) {
        Object.assign(this, partial);
    }
}
