import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { CreateHousingDto } from "../dtos/createHousing.dto";
import { HousingService } from "../services/housing.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import type { Response } from "express";

@Controller("housing")
export class HousingController {
    constructor(private readonly housingService: HousingService) { }

    @Post("create")
    @UseInterceptors(FilesInterceptor("files"))
    createHousing(@Body() createHousing: CreateHousingDto, @UploadedFiles() files: Array<Express.Multer.File>) {
        if (!files || files.length === 0) return new BadRequestException();
        const filesData: Array<string> = [];
        files.forEach(file => filesData.push(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`));
        return this.housingService.createHousing(createHousing, filesData);
    }

    @Get("/random")
    async getRandom() {
        const data = await this.housingService.findRandom();
        if (data) return data;
        else throw new NotFoundException("No random housing found");
    }

    @Delete("/delete/:id")
    async deleteHousing(@Param("id") id: string, @Res() res: Response) {
        const result = await this.housingService.remove(id);
        return result.affected > 0 ? res.send(result).status(HttpStatus.OK) : res.sendStatus(HttpStatus.NOT_MODIFIED);
    }
}
