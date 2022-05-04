import { IsDateString, IsNotEmpty, IsNumberString, IsString, MaxLength, MinLength } from "class-validator";

export class CreateHousingDto {
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(99)
    address: string;

    @IsNotEmpty()
    @MinLength(1)
    ownerName: string;

    @IsString()
    type: string;

    @IsNumberString()
    @MaxLength(999)
    nbRoom: number;

    @IsNumberString()
    area: number;

    @IsString()
    state: string;

    @IsNumberString()
    price: number;

    @IsDateString()
    date: Date;

    @IsString()
    city: string;

    @IsNumberString()
    nbParking: number;

    @IsString()
    image: string;

    @IsString()
    @MinLength(1)
    desc: string;
}
