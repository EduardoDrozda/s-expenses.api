import { IsNotEmpty, IsString } from "class-validator";

export class DeleteProjectRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  companyId: string;

  @IsString()
  @IsNotEmpty()
  deletedById: string;
} 