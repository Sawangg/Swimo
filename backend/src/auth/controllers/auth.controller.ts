import { Controller, Delete, Get, Post, Request as RequestD, Res, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard, LocalAuthGuard } from "../utils/LocalGuard";
import type { Request, Response } from "express";

@Controller("auth")
export class AuthController {
    @UseGuards(AuthenticatedGuard)
    @Get("/")
    isLogged(@RequestD() req: Request) {
        return req.user;
    }

    @UseGuards(LocalAuthGuard)
    @Post("/login")
    login(@RequestD() req: Request) {
        return req.user;
    }

    @UseGuards(AuthenticatedGuard)
    @Delete("/logout")
    logout(@RequestD() req: Request, @Res() res: Response) {
        req.logout();
        return res.sendStatus(200);
    }
}
