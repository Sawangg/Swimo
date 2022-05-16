import { IsNotEmpty, MinLength } from "class-validator";

export class CreateLikeDto {
    @IsNotEmpty()
    @MinLength(1)
    customerId: string;

    @IsNotEmpty()
    @MinLength(1)
    houseId: string;
}
