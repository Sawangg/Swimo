import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { SellsService } from "../services/sells.service";

@Controller("sell")
export class SellsController {
    constructor(private readonly sellsService: SellsService) { }

    @Get("/")
    async getData() {
        const data = await this.sellsService.findAll();
        if (data) return data;
        else throw new HttpException("Visit not found", HttpStatus.NOT_FOUND);
    }
}
