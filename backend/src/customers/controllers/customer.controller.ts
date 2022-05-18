import { Body, Controller, Delete, HttpStatus, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors, Request, ClassSerializerInterceptor, Get, BadRequestException, NotFoundException } from "@nestjs/common";
import { CustomerService } from "../services/customer.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthenticatedGuard } from "src/auth/utils/LocalGuard";
import { SerializedCustomer } from "../entities/customer.entity";
import { CreateLikeDto } from "../dtos/CreateLike.dto";
import { CreateCustomerDto } from "../dtos/CreateCustomer.dto";
import { UpdateCustomerDto } from "../dtos/UpdateCustomer.dto";
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
    @Post("update")
    async uploadAvatar(@Request() req: any, @Body() body: UpdateCustomerDto, @UploadedFile() file: Express.Multer.File): Promise<SerializedCustomer> {
        const customer = await this.customerService.updateCustomer(+req.user.id, body, file);
        return new SerializedCustomer(customer);
    }

    @UseGuards(AuthenticatedGuard)
    @Post("like")
    async setLike(@Request() req: any, @Body() createLikeDto: CreateLikeDto) {
        const likes = await this.customerService.createLike(req.user.id, createLikeDto);
        if (!likes || likes.length === 0) throw new BadRequestException();
        return likes;
    }

    @UseGuards(AuthenticatedGuard)
    @Get("likes")
    async getLikes(@Request() req: any) {
        const likes = await this.customerService.getLikes(req.user.id);
        if (likes.length === 0) throw new NotFoundException();
        return likes;
    }

    @UseGuards(AuthenticatedGuard)
    @Delete("like/:houseId")
    deleteLike(@Request() req: any, @Param("houseId") houseId: string) {
        return this.customerService.removeLike(req.user.id, +houseId);
    }
}
