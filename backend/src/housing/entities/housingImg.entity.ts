import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Housing } from "./housing.entity";

@Entity()
export class HousingImg {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "photo", type: "text", nullable: true })
    photo?: string;

    @ManyToOne(() => Housing, (housing: Housing) => housing.photos, { onDelete: "CASCADE" })
    house: Housing;
}
