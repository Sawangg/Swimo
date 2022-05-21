import { forwardRef, Module } from "@nestjs/common";
import { HousingController } from "./controllers/housing.controller";
import { HousingService } from "./services/housing.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Housing } from "src/housing/entities/housing.entity";
import { CustomerModule } from "src/customers/customer.module";

@Module({
    imports: [TypeOrmModule.forFeature([Housing]), forwardRef(() => CustomerModule)],
    controllers: [HousingController],
    providers: [HousingService],
    exports: [HousingService],
})
export class HousingModule { }
