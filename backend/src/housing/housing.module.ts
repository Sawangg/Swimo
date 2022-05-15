import { Module } from "@nestjs/common";
import { HousingController } from "./controllers/housing.controller";
import { HousingService } from "./services/housing.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Housing } from "src/housing/entities/housing.entity";
import { HousingImg } from "./entities/housingImg.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Housing, HousingImg])],
    controllers: [HousingController],
    providers: [HousingService],
})
export class HousingModule { }
