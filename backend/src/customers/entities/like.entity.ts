import { Entity, Column } from "typeorm";

@Entity()
export class Like {
    @Column({ name: "customerId", primary: true })
    customerId: string;

    @Column({ name: "houseId", primary: true })
    houseId: string;
}
