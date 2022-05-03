import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Housing } from "src/housing/entities/housing.entity";
import type { Repository } from "typeorm";

@Injectable()
export class HousingService {
    constructor(
        @InjectRepository(Housing)
        private customersRepository: Repository<Housing>,
    ) { }

    findAll(): Promise<Housing[]> {
        return this.customersRepository.find();
    }

    findOne(id: string): Promise<Housing> {
        return this.customersRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.customersRepository.delete(id);
    }
}
