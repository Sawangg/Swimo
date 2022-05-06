import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard, LocalAuthGuard } from "../utils/LocalGuard";

@Controller("auth")
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @Post("/login")
    login(@Request() req) {
        return req.user;
    }

    @UseGuards(AuthenticatedGuard)
    @Get("/logout")
    logout() {
        // return { message: "hi" };
    }
}
