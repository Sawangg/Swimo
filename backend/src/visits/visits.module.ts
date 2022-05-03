import { Module } from "@nestjs/common";
import { VisitsController } from "./controllers/visits.controller";
import { VisitsService } from "./services/visits.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Visit } from "./entities/visit.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Visit])],
    controllers: [VisitsController],
    providers: [VisitsService],
})
export class VisitsModule { }
