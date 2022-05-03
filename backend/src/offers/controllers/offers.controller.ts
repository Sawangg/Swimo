import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { OffersService } from "../services/offers.service";

@Controller("offer")
export class OffersController {
    constructor(private offersService: OffersService) { }

    @Get("/")
    async getData() {
        const data = await this.offersService.findAll();
        if (data) return data;
        else throw new HttpException("Offers not found", HttpStatus.NOT_FOUND);
    }
}
