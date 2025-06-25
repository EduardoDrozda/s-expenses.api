import { IsNotEmpty, IsString } from "class-validator";

export class GetByIdRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  companyId: string;
}