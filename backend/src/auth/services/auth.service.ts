import { Inject, Injectable } from "@nestjs/common";
import { CustomerService } from "src/customers/services/customer.service";
import { compatePasswords } from "src/utils/password";

@Injectable()
export class AuthService {
    constructor(
        @Inject("CUSTOMER_SERVICE") private customerService: CustomerService,
    ) { }

    async validateUser(username: string, rawPass: string): Promise<any> {
        const userDB = await this.customerService.findByUsername(username);
        if (userDB && compatePasswords(rawPass, userDB.password)) {
            return userDB;
        }
        return null;
    }
}
