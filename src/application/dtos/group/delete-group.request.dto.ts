import { IsNotEmpty, IsString } from "class-validator";

export class DeleteGroupRequestDto {
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