import { BaseRequestDTO } from "@application/dtos/base";
import { CreateProjectDTO } from "@application/dtos/projects/requests/create-projects.dto";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateCostCenterGroupDto extends BaseRequestDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateProjectDTO)
    projects: CreateProjectDTO[];
}