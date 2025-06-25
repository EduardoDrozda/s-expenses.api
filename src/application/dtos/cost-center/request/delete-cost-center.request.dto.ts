import { IsNotEmpty, IsString } from "class-validator";

export class DeleteCostCenterRequestDto {
  id: string;
  companyId: string;
}