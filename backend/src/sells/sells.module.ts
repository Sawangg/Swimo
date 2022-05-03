import { Module } from "@nestjs/common";
import { SellsController } from "./controllers/sells.controller";
import { SellsService } from "./services/sells.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sell } from "./entities/sell.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Sell])],
    controllers: [SellsController],
    providers: [SellsService],
})
export class SellsModule { }
