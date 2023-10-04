import { IsNumber } from "class-validator";

export class CreateNomenklaturaDto {
    name: string;

    @IsNumber()
    cost: number;
}
