import { Entity, Column } from "typeorm";

@Entity()
export class Offer {
    @Column({ primary: true })
    idClient: string;

    @Column({ primary: true })
    idLogement: string;

    @Column({ primary: true })
    date: Date;

    @Column({ type: "float", default: 0.3 })
    commission: number;

    @Column({ default: "On going" })
    state: string;
}
