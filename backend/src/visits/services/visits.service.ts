import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Visit } from "src/visits/entities/visit.entity";
import type { Repository } from "typeorm";

@Injectable()
export class VisitsService {
    constructor(
        @InjectRepository(Visit)
        private customersRepository: Repository<Visit>,
    ) { }

    findAll(): Promise<Visit[]> {
        return this.customersRepository.find();
    }

    findOne(id: string): Promise<Visit> {
        return this.customersRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.customersRepository.delete(id);
    }
}
