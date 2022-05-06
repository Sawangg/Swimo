import type { ISession } from "connect-typeorm/out";
import { Entity, Column, Index, PrimaryColumn } from "typeorm";

@Entity({ name: "sessions" })
export class SessionEntity implements ISession {
    @Index()
    @Column("bigint")
    expiredAt: number;

    @PrimaryColumn("varchar", { length: 255 })
    id: string;

    @Column("text")
    json: string;
}
