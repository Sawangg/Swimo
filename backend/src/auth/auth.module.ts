import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { CustomerService } from "src/customers/services/customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "src/customers/entities/customer.entity";
import { LocalStrategy } from "./utils/LocalStrategy";
import { SessionSerializer } from "./utils/SessionSerializer";

@Module({
    imports: [TypeOrmModule.forFeature([Customer])],
    controllers: [AuthController],
    providers: [
        {
            provide: "AUTH_SERVICE",
            useClass: AuthService,
        },
        {
            provide: "CUSTOMER_SERVICE",
            useClass: CustomerService,
        },
        LocalStrategy,
        SessionSerializer,
    ],
})
export class AuthModule { }
