import { Type } from "class-transformer";
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";

export class CreateExpenseRequestDto {
  @IsNotEmpty()
  @IsDateString()
  issueDate: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  description: string;

  @IsUUID()
  costCenterId?: string;

  @IsUUID()
  @IsOptional()
  groupId?: string;

  @IsUUID()
  @IsOptional()
  projectId?: string;

  files: Express.Multer.File[];
}