import { Entity, Column } from "typeorm";

@Entity()
export class Customer {
    @Column({ primary: true })
    idClient: number;

    @Column({ primary: true })
    idLogement: number;

    @Column({ primary: true, default: new Date(Date.now()) })
    date: Date;
}
