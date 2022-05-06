import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { CreateCustomerDto } from "../dtos/CreateCustomer.dto";
import { CustomerService } from "../services/customer.service";
import type { Response } from "express";

@Controller("customer")
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get("/")
    async getAll() {
        const data = await this.customerService.findAll();
        if (data) return data;
        else throw new HttpException("Customers not found", HttpStatus.NOT_FOUND);
    }

    @Post("register")
    createCustomer(@Body() createCustomer: CreateCustomerDto) {
        return this.customerService.createCustomer(createCustomer);
    }

    @Delete("/delete/:id")
    async deleteCustomer(@Param("id") id: string, @Res() res: Response) {
        const result = await this.customerService.remove(id);
        return result.affected > 0 ? res.send(result).status(HttpStatus.OK) : res.status(HttpStatus.NOT_MODIFIED);
    }
}
