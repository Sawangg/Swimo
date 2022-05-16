import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "src/customers/entities/customer.entity";
import { CustomerService } from "./services/customer.service";
import { CustomerController } from "./controllers/customer.controller";
import { Like } from "./entities/like.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Customer, Like])],
    controllers: [CustomerController],
    providers: [CustomerService],
})
export class CustomerModule { }
