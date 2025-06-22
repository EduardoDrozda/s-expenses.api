import { Type } from "class-transformer";
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsUUID } from "class-validator";

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

  files: Express.Multer.File[];
}