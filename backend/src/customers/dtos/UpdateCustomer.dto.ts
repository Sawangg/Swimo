import { IsEmail, IsOptional, MaxLength, MinLength } from "class-validator";

export class UpdateCustomerDto {
    @IsOptional()
    @MinLength(1)
    @MaxLength(50)
    nom?: string;

    @IsOptional()
    @MinLength(1)
    @MaxLength(50)
    prenom?: string;

    @IsOptional()
    @IsEmail()
    @MinLength(1)
    @MaxLength(50)
    login?: string;

    @IsOptional()
    @MinLength(1)
    @MaxLength(50)
    password?: string;
}
