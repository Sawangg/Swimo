import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { Sell } from "../entities/sell.entity";

@Injectable()
export class SellsService {
    constructor(
        @InjectRepository(Sell)
        private customersRepository: Repository<Sell>,
    ) { }

    findAll(): Promise<Sell[]> {
        return this.customersRepository.find();
    }

    findOne(id: string): Promise<Sell> {
        return this.customersRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.customersRepository.delete(id);
    }
}
