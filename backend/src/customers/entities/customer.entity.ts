import { Exclude } from "class-transformer";
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

    @Column({ name: "avatar", type: "text", nullable: true })
    avatar?: string;

    @Column({ name: "admin", default: false, nullable: false })
    isAdmin: boolean;
}

export class SerializedCustomer {
    id: number;

    nom: string;

    prenom: string;

    login: string;

    @Exclude()
    password: string;

    avatar?: string;

    isAdmin: boolean;

    constructor(partial: Partial<SerializedCustomer>) {
        Object.assign(this, partial);
    }
}
