import { IsNotEmpty, IsString } from "class-validator";

export class BaseDeleteRequestDto {
  id: string;
  companyId: string;
  deletedById: string;
}