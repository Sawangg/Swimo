import { Inject, Injectable } from "@nestjs/common";
import { CustomerService } from "src/customers/services/customer.service";
import { compatePasswords } from "src/utils/password";
import type { Customer } from "src/customers/entities/customer.entity";

@Injectable()
export class AuthService {
    constructor(
        @Inject(CustomerService)
        private readonly customerService: CustomerService,
    ) { }

    async validateUser(username: string, rawPass: string): Promise<Customer | null> {
        const userDB = await this.customerService.findByUsername(username);
        if (userDB && compatePasswords(rawPass, userDB.password)) return userDB;
        return null;
    }
}
