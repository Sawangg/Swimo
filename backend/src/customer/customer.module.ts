import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "src/customer/entities/customer.entity";
import { CustomerService } from "./services/customer.service";
import { CustomerController } from "./controllers/customer.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Customer])],
    providers: [CustomerService],
    controllers: [CustomerController],
})
export class CustomerModule { }
