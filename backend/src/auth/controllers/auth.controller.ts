import { ClassSerializerInterceptor, Controller, Delete, Get, Post, Request as RequestD, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthenticatedGuard, LocalAuthGuard } from "../utils/LocalGuard";
import type { Request, Response } from "express";
import { SerializedCustomer } from "src/customers/entities/customer.entity";

@Controller("auth")
export class AuthController {
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthenticatedGuard)
    @Get("/")
    isLogged(@RequestD() req: Request) {
        return new SerializedCustomer(req.user);
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
