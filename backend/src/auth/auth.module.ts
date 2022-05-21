import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "src/customers/entities/customer.entity";
import { LocalStrategy } from "./utils/LocalStrategy";
import { SessionSerializer } from "./utils/SessionSerializer";
import { CustomerModule } from "src/customers/customer.module";
import { HousingModule } from "src/housing/housing.module";

@Module({
    imports: [TypeOrmModule.forFeature([Customer]), CustomerModule, HousingModule],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule { }
