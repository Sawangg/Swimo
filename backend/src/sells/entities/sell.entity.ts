import { Entity, Column } from "typeorm";

@Entity()
export class Sell {
    @Column({ primary: true })
    idOffer: number;

    @Column({ primary: true })
    idClient: number;

    @Column({ primary: true })
    idLogement: number;

    @Column({ primary: true })
    date: Date;

    @Column({ type: "float", default: 0.3 })
    commission: number;
}
