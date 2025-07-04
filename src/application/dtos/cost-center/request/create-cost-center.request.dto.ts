import { BaseRequestDTO } from "@application/dtos/base/requests";
import { CreateCostCenterGroupDto } from "@application/dtos/cost-center-group/request";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateCostCenterRequestDto extends BaseRequestDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;
}