import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerService } from "src/customers/services/customer.service";
import { Housing } from "src/housing/entities/housing.entity";
import type { DeleteResult, Repository } from "typeorm";
import type { CreateHousingDto } from "../dtos/createHousing.dto";

@Injectable()
export class HousingService {
    constructor(
        @InjectRepository(Housing)
        private readonly housingRepository: Repository<Housing>,
        @Inject(forwardRef(() => CustomerService))
        private readonly customerService: CustomerService,
    ) { }

    async createHousing(createHousingDto: CreateHousingDto, id: number, files: Array<Express.Multer.File>) {
        const filesData: Array<string> = [];
        files.forEach(file => filesData.push(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`));
        createHousingDto.photos = filesData;
        createHousingDto.owner = await this.customerService.findOne(id);
        return this.housingRepository.save(createHousingDto);
    }

    findAll(): Promise<Housing[]> {
        return this.housingRepository.find();
    }

    findOne(id: number) {
        return this.housingRepository.findOne({ where: { id } });
    }

    async findRandom(id: number) {
        const result = await this.housingRepository.createQueryBuilder("housing")
            .leftJoinAndSelect("likes", "l", "housing.id = l.housingId")
            .where("l.customerId IS NULL")
            .orWhere("l.customerId = :id AND l.housingId != housing.id", { id })
            .orderBy("RANDOM()")
            .getOne();
        return result;
    }

    async remove(id: string): Promise<DeleteResult> {
        const deleted = await this.housingRepository.delete(id);
        return deleted;
    }
}
