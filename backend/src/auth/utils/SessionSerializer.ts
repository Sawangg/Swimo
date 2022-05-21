import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import type { Customer } from "src/customers/entities/customer.entity";
import { CustomerService } from "src/customers/services/customer.service";

export class SessionSerializer extends PassportSerializer {
    constructor(@Inject(CustomerService) private readonly customerService: CustomerService) {
        super();
    }

    serializeUser(customer: Customer, done: (err: any, customer: Customer) => void) {
        done(null, customer);
    }

    async deserializeUser(customer: Customer, done: (err: any, customer: Customer) => void) {
        const customerDB = await this.customerService.findOne(customer.id);
        return customerDB ? done(null, customer) : done(null, null);
    }
}
