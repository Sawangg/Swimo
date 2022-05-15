import { Body, Controller, Delete, HttpStatus, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors, Request, BadRequestException, ClassSerializerInterceptor } from "@nestjs/common";
import { CreateCustomerDto } from "../dtos/CreateCustomer.dto";
import { CustomerService } from "../services/customer.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthenticatedGuard } from "src/auth/utils/LocalGuard";
import { SerializedCustomer } from "../entities/customer.entity";
import type { Response } from "express";

@Controller("customer")
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Post("register")
    createCustomer(@Body() createCustomer: CreateCustomerDto) {
        return this.customerService.createCustomer(createCustomer);
    }

    @Delete("/delete/:id")
    async deleteCustomer(@Param("id") id: string, @Res() res: Response) {
        const result = await this.customerService.remove(id);
        return result.affected > 0 ? res.send(result).status(HttpStatus.OK) : res.status(HttpStatus.NOT_MODIFIED);
    }

    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @UseInterceptors(FileInterceptor("file"))
    @Post("/avatar/upload")
    async uploadAvatar(@Request() req: any, @UploadedFile() file: Express.Multer.File): Promise<SerializedCustomer | BadRequestException> {
        if (!file) return new BadRequestException();
        const customer = await this.customerService.saveAvatar(req.user.id, file.mimetype, file.buffer);
        return new SerializedCustomer(customer);
    }
}
