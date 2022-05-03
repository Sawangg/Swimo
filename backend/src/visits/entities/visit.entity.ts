import { Customer } from "src/customers/entities/customer.entity";
import { Housing } from "src/housing/entities/housing.entity";
import { Entity, Column, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Visit {
    @OneToOne(() => Customer)
    @JoinColumn({ name: "idCustomer" })
    idCustomer: number;

    @OneToOne(() => Housing)
    @JoinColumn({ name: "idHousing" })
    idHousing: number;

    @Column({ name: "visitDate", primary: true })
    visitDate: Date;
}
