import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/customer/entities/customer.entity";
import type { Repository } from "typeorm";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
    ) { }

    findAll(): Promise<Customer[]> {
        return this.customersRepository.find();
    }

    findOne(id: string): Promise<Customer> {
        return this.customersRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.customersRepository.delete(id);
    }
}
