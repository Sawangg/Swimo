import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Request, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateHousingDto } from "../dtos/createHousing.dto";
import { HousingService } from "../services/housing.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import type { Response } from "express";
import { AuthenticatedGuard } from "src/auth/utils/LocalGuard";

@Controller("housing")
export class HousingController {
    constructor(private readonly housingService: HousingService) { }

    @Post("create")
    @UseInterceptors(FilesInterceptor("files"))
    createHousing(@Body() createHousing: CreateHousingDto, @UploadedFiles() files: Array<Express.Multer.File>) {
        if (!files || files.length === 0) throw new BadRequestException();
        return this.housingService.createHousing(createHousing, files);
    }

    @UseGuards(AuthenticatedGuard)
    @Get("/random")
    async getRandom(@Request() req: any) {
        const data = await this.housingService.findRandom(+req.user.id);
        if (!data) throw new NotFoundException("No random housing found");
        else return data;
    }

    @Delete("/delete/:id")
    async deleteHousing(@Param("id") id: string, @Res() res: Response) {
        const result = await this.housingService.remove(id);
        return result.affected > 0 ? res.send(result).status(HttpStatus.OK) : res.sendStatus(HttpStatus.NOT_MODIFIED);
    }
}
