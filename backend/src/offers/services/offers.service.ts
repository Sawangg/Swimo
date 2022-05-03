import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { Offer } from "../entities/offer.entity";

@Injectable()
export class OffersService {
    constructor(
        @InjectRepository(Offer)
        private customersRepository: Repository<Offer>,
    ) { }

    findAll(): Promise<Offer[]> {
        return this.customersRepository.find();
    }

    findOne(id: string): Promise<Offer> {
        return this.customersRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.customersRepository.delete(id);
    }
}
