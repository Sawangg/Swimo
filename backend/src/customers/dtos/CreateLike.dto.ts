import { IsNotEmpty } from "class-validator";

export class CreateLikeDto {
    @IsNotEmpty()
    houseId: number;
}
