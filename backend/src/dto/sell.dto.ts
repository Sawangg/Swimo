import { Entity, Column } from "typeorm";

@Entity()
export class Customer {
    @Column({ primary: true })
    idOffer: number;

    @Column({ primary: true })
    idClient: number;

    @Column({ primary: true })
    idLogement: number;

    @Column({ primary: true, default: new Date(Date.now()) })
    date: Date;

    @Column({ default: 0.3 })
    commission: number;
}
