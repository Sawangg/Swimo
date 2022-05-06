import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ name: "admin", default: false, nullable: false })
    isAdmin: boolean;
}
