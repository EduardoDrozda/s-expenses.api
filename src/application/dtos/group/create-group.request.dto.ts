import { BaseRequestDTO } from "@application/dtos/base/requests";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateGroupRequestDto extends BaseRequestDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string | null;
} 