import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/customers/entities/customer.entity";
import { HousingService } from "src/housing/services/housing.service";
import { encodePassword } from "src/utils/password";
import type { Housing } from "src/housing/entities/housing.entity";
import type { DeleteResult, Repository } from "typeorm";
import type { CreateCustomerDto } from "../dtos/CreateCustomer.dto";
import type { CreateLikeDto } from "../dtos/CreateLike.dto";
import type { UpdateCustomerDto } from "../dtos/UpdateCustomer.dto";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customersRepository: Repository<Customer>,
        private readonly housingService: HousingService,
    ) { }

    createCustomer(createCustomerDto: CreateCustomerDto) {
        const password = encodePassword(createCustomerDto.password);
        const newCustomer = this.customersRepository.create({ ...createCustomerDto, password });
        return this.customersRepository.save(newCustomer);
    }

    async createLike(id: number, createLike: CreateLikeDto): Promise<Housing[] | null> {
        const house = await this.housingService.findOne(createLike.houseId);
        if (!house) return null;
        const customer = await this.findOne(id);
        customer.likes.push(house);
        await this.customersRepository.save({ id, likes: customer.likes });
        return this.getLikes(id);
    }

    async findOne(id: number) {
        const result = await this.customersRepository.createQueryBuilder("customer")
            .leftJoinAndSelect("customer.likes", "like")
            .where("customer.id = :id", { id })
            .getMany();
        return result[0];
    }

    async getLikes(id: number) {
        const result = await this.customersRepository.createQueryBuilder("customer")
            .leftJoinAndSelect("customer.likes", "like")
            .where("customer.id = :id", { id })
            .getMany();
        return result[0].likes;
    }

    findByUsername(login: string): Promise<Customer> {
        return this.customersRepository.findOne({ where: { login } });
    }

    async updateCustomer(id: number, data: UpdateCustomerDto, file: Express.Multer.File): Promise<Customer> {
        if (!file) await this.customersRepository.save({ id, nom: data.nom, prenom: data.prenom });
        else await this.customersRepository.save({ id, nom: data.nom, prenom: data.prenom, avatar: `data:${file.mimetype};base64,${file.buffer.toString("base64")}` });
        return this.findOne(id);
    }

    async removeLike(id: number, houseId: number) {
        const customer = await this.findOne(id);
        const result = [];
        customer.likes.forEach(house => {
            if (house.id !== houseId) result.push(house);
        });
        customer.likes = result;
        return this.customersRepository.save(customer);
    }

    async remove(id: string): Promise<DeleteResult> {
        const deleted = await this.customersRepository.delete(id);
        return deleted;
    }
}
