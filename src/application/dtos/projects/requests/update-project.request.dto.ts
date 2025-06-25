import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProjectRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string | null;

  updatedById: string;
  companyId: string;
} 