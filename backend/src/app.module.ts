import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
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
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get("DB_HOST"),
                port: +configService.get<number>("DB_PORT"),
                username: configService.get("DB_USERNAME"),
                password: configService.get("DB_PASSWORD"),
                database: configService.get("DB_NAME"),
                entities: [SessionEntity],
                synchronize: true,
                autoLoadEntities: true,
                keepConnectionAlive: true,
            }),
            inject: [ConfigService],
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
