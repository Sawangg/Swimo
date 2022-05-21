import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Request, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateHousingDto } from "../dtos/createHousing.dto";
import { HousingService } from "../services/housing.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { AuthenticatedGuard } from "src/auth/utils/LocalGuard";
import type { Response } from "express";
import { SerializedCustomer } from "src/customers/entities/customer.entity";

@Controller("housing")
export class HousingController {
    constructor(private readonly housingService: HousingService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthenticatedGuard)
    @Post("create")
    @UseInterceptors(FilesInterceptor("files"))
    async createHousing(@Request() req: any, @Body() createHousing: CreateHousingDto, @UploadedFiles() files: Array<Express.Multer.File>) {
        if (!files || files.length === 0) throw new BadRequestException("No files found");
        const data = await this.housingService.createHousing(createHousing, +req.user.id, files);
        data.owner = new SerializedCustomer(data.owner);
        if (data) return data;
        else throw new BadRequestException("Could not create the housing");
    }

    @UseGuards(AuthenticatedGuard)
    @Get("/random")
    async getRandom(@Request() req: any) {
        const data = await this.housingService.findRandom(+req.user.id);
        if (data) return data;
        else throw new NotFoundException("No random housing found");
    }

    @Delete("/delete/:id")
    async deleteHousing(@Param("id") id: string, @Res() res: Response) {
        const result = await this.housingService.remove(id);
        return result.affected > 0 ? res.send(result).status(HttpStatus.OK) : res.sendStatus(HttpStatus.NOT_MODIFIED);
    }
}
