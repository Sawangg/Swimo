import { Module } from "@nestjs/common";
import { OffersController } from "./controllers/offers.controller";
import { OffersService } from "./services/offers.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Offer } from "./entities/offer.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Offer])],
    controllers: [OffersController],
    providers: [OffersService],
})
export class OffersModule { }
