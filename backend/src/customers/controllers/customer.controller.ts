import { Body, Controller, Delete, HttpStatus, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors, Request, BadRequestException, ClassSerializerInterceptor, Get } from "@nestjs/common";
import { CustomerService } from "../services/customer.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateCustomerDto } from "../dtos/CreateCustomer.dto";
import { CreateLikeDto } from "../dtos/CreateLike.dto";
import { AuthenticatedGuard } from "src/auth/utils/LocalGuard";
import { SerializedCustomer } from "../entities/customer.entity";
import type { Response } from "express";

@Controller("customer")
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post("register")
    async createCustomer(@Body() createCustomer: CreateCustomerDto) {
        const customer = await this.customerService.createCustomer(createCustomer);
        return new SerializedCustomer(customer);
    }

    @Delete("delete/:id")
    async deleteCustomer(@Param("id") id: string, @Res() res: Response) {
        const result = await this.customerService.remove(id);
        return result.affected > 0 ? res.send(result).status(HttpStatus.OK) : res.status(HttpStatus.NOT_MODIFIED);
    }

    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @UseInterceptors(FileInterceptor("file"))
    @Post("avatar/upload")
    async uploadAvatar(@Request() req: any, @UploadedFile() file: Express.Multer.File): Promise<SerializedCustomer | BadRequestException> {
        if (!file) return new BadRequestException();
        const customer = await this.customerService.saveAvatar(req.user.id, file.mimetype, file.buffer);
        return new SerializedCustomer(customer);
    }

    @Post("like")
    setLike(@Body() createLikeDto: CreateLikeDto) {
        return this.customerService.createLike(createLikeDto);
    }

    @UseGuards(AuthenticatedGuard)
    @Get("likes")
    getLikes(@Request() req: any) {
        return this.customerService.findLikes(req.user.id);
    }
}
