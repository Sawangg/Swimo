import { ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Post, Request as RequestD, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthenticatedGuard, LocalAuthGuard } from "../utils/LocalGuard";
import type { Request, Response } from "express";
import { SerializedCustomer } from "src/customers/entities/customer.entity";
import { CustomerService } from "src/customers/services/customer.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly customerService: CustomerService) { }


    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthenticatedGuard)
    @Get("/")
    async isLogged(@RequestD() req: any) {
        try {
            const user = await this.customerService.findOne(req.user.id);
            return new SerializedCustomer(user);
        } catch {
            return new NotFoundException();
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(LocalAuthGuard)
    @Post("/login")
    login(@RequestD() req: Request) {
        return new SerializedCustomer(req.user);
    }

    @UseGuards(AuthenticatedGuard)
    @Delete("/logout")
    logout(@RequestD() req: Request, @Res() res: Response) {
        req.logout();
        return res.sendStatus(200);
    }
}
