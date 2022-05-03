import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import type { CustomerService } from "../services/customer.service";

@Controller("customer")
export class CustomerController {
    constructor(private customerService: CustomerService) { }

    @Get("/")
    async getAll() {
        const data = await this.customerService.findAll();
        if (!data) return new HttpException("No data found", HttpStatus.NOT_FOUND);
        return "yo";
    }
}
