import { BaseRequestDTO } from "@application/dtos/base";
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

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateCostCenterGroupDto)
    costCenterGroups: CreateCostCenterGroupDto[];
}