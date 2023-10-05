import { IsNumber } from "class-validator";
import { Links } from "src/links/entities/link.entity";

export class CreateNomenklaturaDto {
    name: string;

    @IsNumber()
    cost: number;

    links: Links[]

    parentLinks: Links[]
}
