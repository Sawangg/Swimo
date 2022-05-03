import { Entity, Column } from "typeorm";

@Entity()
export class Housing {
    @Column({ primary: true })
    idClient: string;

    @Column({ primary: true })
    idLogement: string;

    @Column({ primary: true, default: new Date(Date.now()) })
    date: Date;

    @Column({ default: 0.3 })
    commission: number;

    @Column({ default: "On going" })
    state: string;
}
