import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { CreateHousingDto } from "../dtos/createHousing.dto";
import { HousingService } from "../services/housing.service";
import type { Response } from "express";

@Controller("housing")
export class HousingController {
    constructor(private readonly housingService: HousingService) { }

    @Get("/")
    async getAll() {
        const data = await this.housingService.findAll();
        if (data.length > 0) return data;
        else throw new HttpException("No housing found", HttpStatus.NOT_FOUND);
    }

    @Post("create")
    createHousing(@Body() createHousing: CreateHousingDto) {
        return this.housingService.createHousing(createHousing);
    }

    @Delete("/delete/:id")
    async deleteHousing(@Param("id") id: string, @Res() res: Response) {
        const result = await this.housingService.remove(id);
        return result.affected > 0 ? res.send(result).status(HttpStatus.OK) : res.sendStatus(HttpStatus.NOT_MODIFIED);
    }
}
