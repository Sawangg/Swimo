import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Housing } from "src/housing/entities/housing.entity";
import { HousingImg } from "../entities/housingImg.entity";
import type { DeleteResult, Repository } from "typeorm";
import type { CreateHousingDto } from "../dtos/createHousing.dto";

@Injectable()
export class HousingService {
    constructor(
        @InjectRepository(Housing)
        private readonly housingRepository: Repository<Housing>,
        @InjectRepository(HousingImg)
        private readonly housingRepositoryImg: Repository<HousingImg>,
    ) { }

    async createHousing(createHousingDto: CreateHousingDto, images: Array<string>) {
        const photosPromised: Array<Promise<HousingImg>> = [];
        images.forEach(image => {
            const housingImg = new HousingImg();
            housingImg.photo = image;
            photosPromised.push(this.housingRepositoryImg.save(housingImg));
        });
        const photos = await Promise.all(photosPromised);
        createHousingDto.photos = photos;
        const newHousing = this.housingRepository.create(createHousingDto);
        return this.housingRepository.save(newHousing);
    }

    findAll(): Promise<Housing[]> {
        return this.housingRepository.find();
    }

    async findRandom() {
        const result = await this.housingRepository.createQueryBuilder("housing")
            .leftJoinAndMapMany("housing.photos", "housing.photos", "photo")
            .orderBy("RANDOM()")
            .getMany();
        const photos = [];
        result[0].photos.forEach(photo => photos.push(photo.photo));
        return { ...result[0], photos };
    }

    async remove(id: string): Promise<DeleteResult> {
        const deleted = await this.housingRepository.delete(id);
        return deleted;
    }
}
