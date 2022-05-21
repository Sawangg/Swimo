import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "src/customers/entities/customer.entity";
import { CustomerService } from "./services/customer.service";
import { CustomerController } from "./controllers/customer.controller";
import { HousingModule } from "src/housing/housing.module";

@Module({
    imports: [TypeOrmModule.forFeature([Customer]), forwardRef(() => HousingModule)],
    controllers: [CustomerController],
    providers: [CustomerService],
    exports: [CustomerService],
})
export class CustomerModule { }
