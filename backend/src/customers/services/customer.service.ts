import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/customers/entities/customer.entity";
import { encodePassword } from "src/utils/password";
import type { DeleteResult, Repository } from "typeorm";
import type { CreateCustomerDto } from "../dtos/CreateCustomer.dto";
import type { CreateLikeDto } from "../dtos/CreateLike.dto";
import type { UpdateCustomerDto } from "../dtos/UpdateCustomer.dto";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customersRepository: Repository<Customer>,
    ) { }

    createCustomer(createCustomerDto: CreateCustomerDto) {
        const password = encodePassword(createCustomerDto.password);
        const newCustomer = this.customersRepository.create({ ...createCustomerDto, password });
        return this.customersRepository.save(newCustomer);
    }

    createLike(createLike: CreateLikeDto) {
        return this.customersRepository.update(createLike.customerId, { });
    }

    async findLikes(id: number) {
        const result = await this.customersRepository.createQueryBuilder("like")
            .innerJoinAndSelect("like.customer", "customer")
            .where("like.customerId = :id", { id })
            .getMany();
        return result[0];
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

    async updateCustomer(id: number, data: UpdateCustomerDto, file: Express.Multer.File): Promise<Customer> {
        if (!file) await this.customersRepository.save({ id, nom: data.nom, prenom: data.prenom });
        else await this.customersRepository.save({ id, nom: data.nom, prenom: data.prenom, avatar: `data:${file.mimetype};base64,${file.buffer.toString("base64")}` });
        return this.findOne(id);
    }
}
