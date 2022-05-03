import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { VisitsService } from "src/visits/services/visits.service";

@Controller("visit")
export class VisitsController {
    constructor(private readonly visitsService: VisitsService) { }

    @Get("/")
    async getData() {
        const data = await this.visitsService.findAll();
        if (data) return data;
        else throw new HttpException("Visit not found", HttpStatus.NOT_FOUND);
    }
}
