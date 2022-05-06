import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TypeormStore } from "connect-typeorm";
import { getConnection } from "typeorm";
import { SessionEntity } from "./auth/entities/Session.entity";
import helmet from "helmet";
import session from "express-session";
import passport from "passport";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(
        session({
            name: "sid",
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 3600000,
            },
            store: new TypeormStore().connect(getConnection().getRepository(SessionEntity)),
        }),
    );

    app.setGlobalPrefix("/api");
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(helmet());

    await app.listen(3001);
}
bootstrap();
