import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { CustomerModule } from "./customers/customer.module";
import { VisitsModule } from "./visits/visits.module";
import { HousingModule } from "./housing/housing.module";
import { OffersModule } from "./offers/offers.module";
import { SellsModule } from "./sells/sells.module";
import { AuthModule } from "./auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { SessionEntity } from "./auth/entities/Session.entity";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, cache: true }),
        PassportModule.register({ session: true }),
        TypeOrmModule.forRoot({
            type: "mariadb",
            host: process.env.NODE_ENV !== "production" ? "localhost" : process.env.DB_HOST,
            port: 3306,
            username: "root",
            password: process.env.DB_PASSWORD,
            database: "agencedb",
            synchronize: process.env.NODE_ENV !== "production",
            keepConnectionAlive: true,
            entities: [SessionEntity],
            autoLoadEntities: true,
        }),
        AuthModule,
        CustomerModule,
        VisitsModule,
        HousingModule,
        OffersModule,
        SellsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
