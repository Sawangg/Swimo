import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Housing } from "src/housing/entities/housing.entity";
import type { DeleteResult, Repository } from "typeorm";
import type { CreateHousingDto } from "../dtos/createHousing.dto";

@Injectable()
export class HousingService {
    constructor(
        @InjectRepository(Housing)
        private housingRepository: Repository<Housing>,
    ) { }

    createHousing(createHousingDto: CreateHousingDto) {
        const newHousing = this.housingRepository.create(createHousingDto);
        return this.housingRepository.save(newHousing);
    }

    findAll(): Promise<Housing[]> {
        return this.housingRepository.find();
    }

    findOne(id: string): Promise<Housing> {
        return this.housingRepository.findOne(id);
    }

    async remove(id: string): Promise<DeleteResult> {
        const deleted = await this.housingRepository.delete(id);
        return deleted;
    }
}
