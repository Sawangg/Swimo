import { IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateCustomerDto {
    @IsOptional()
    @MinLength(1)
    @MaxLength(50)
    nom: string;

    @IsOptional()
    @MinLength(1)
    @MaxLength(50)
    prenom: string;
}
