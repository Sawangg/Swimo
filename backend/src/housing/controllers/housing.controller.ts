import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { HousingService } from "../services/housing.service";

@Controller("housing")
export class HousingController {
    constructor(private readonly housingService: HousingService) { }

    @Get("/")
    async getData() {
        const data = await this.housingService.findAll();
        if (data) return data;
        else throw new HttpException("Housing not found", HttpStatus.NOT_FOUND);
    }
}
