import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { CustomerService } from "../services/customer.service";

@Controller("customer")
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get("/")
    async getAll() {
        const data = await this.customerService.findAll();
        if (data) return data;
        else throw new HttpException("Offers not found", HttpStatus.NOT_FOUND);
    }
}
