import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/customers/entities/customer.entity";
import { encodePassword } from "src/utils/password";
import type { DeleteResult, Repository } from "typeorm";
import type { CreateCustomerDto } from "../dtos/CreateCustomer.dto";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
    ) { }

    createCustomer(createCustomerDto: CreateCustomerDto) {
        const password = encodePassword(createCustomerDto.password);
        const newCustomer = this.customersRepository.create({ ...createCustomerDto, password });
        return this.customersRepository.save(newCustomer);
    }

    findAll(): Promise<Customer[]> {
        return this.customersRepository.find();
    }

    findOne(id: number): Promise<Customer> {
        return this.customersRepository.findOne(id);
    }

    findByUsername(login: string): Promise<Customer> {
        return this.customersRepository.findOne({ where: { login } });
    }

    async remove(id: string): Promise<DeleteResult> {
        const deleted = await this.customersRepository.delete(id);
        return deleted;
    }

    async saveAvatar(id: string, mime: string, data: Buffer): Promise<Customer> {
        await this.customersRepository.update(id, { avatar: `data:${mime};base64,${data.toString("base64")}` });
        return this.findOne(+id);
    }
}
