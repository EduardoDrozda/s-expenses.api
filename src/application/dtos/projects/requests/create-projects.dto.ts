import { BaseRequestDTO } from "@application/dtos/base/requests";
import { IsOptional, IsString } from "class-validator";
import { IsNotEmpty } from "class-validator";

export class CreateProjectDTO extends BaseRequestDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;
}