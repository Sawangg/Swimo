import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { CustomerModule } from "./customer/customer.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, cache: true }),
        TypeOrmModule.forRoot({
            type: "mariadb",
            host: process.env.NODE_ENV !== "production" ? "localhost" : process.env.DB_NAME,
            port: 3306,
            username: "root",
            password: process.env.DB_PASSWORD,
            database: "agencedb",
            synchronize: process.env.NODE_ENV !== "production",
            autoLoadEntities: true,
        }),
        CustomerModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
