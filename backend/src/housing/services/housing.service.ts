import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Housing } from "src/housing/entities/housing.entity";
import type { DeleteResult, Repository } from "typeorm";
import type { CreateHousingDto } from "../dtos/createHousing.dto";

@Injectable()
export class HousingService {
    constructor(
        @InjectRepository(Housing)
        private readonly housingRepository: Repository<Housing>,
    ) { }

    createHousing(createHousingDto: CreateHousingDto, files: Array<Express.Multer.File>) {
        const filesData: Array<string> = [];
        files.forEach(file => filesData.push(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`));
        createHousingDto.photos = filesData;
        const newHousing = this.housingRepository.create(createHousingDto);
        return this.housingRepository.save(newHousing);
    }

    findAll(): Promise<Housing[]> {
        return this.housingRepository.find();
    }

    findOne(id: number) {
        return this.housingRepository.findOne(id);
    }

    async findRandom() {
        const result = await this.housingRepository.createQueryBuilder("housing")
            .select("*")
            .orderBy("RANDOM()")
            .getRawOne();
        return result;
    }

    async remove(id: string): Promise<DeleteResult> {
        const deleted = await this.housingRepository.delete(id);
        return deleted;
    }
}
