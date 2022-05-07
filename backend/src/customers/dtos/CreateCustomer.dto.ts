import { Exclude } from "class-transformer";
import { IsBooleanString, IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    nom: string;

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    prenom: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(50)
    login: string;

    @Exclude()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    password: string;

    @IsOptional()
    @IsBooleanString()
    isAdmin: boolean;
}
