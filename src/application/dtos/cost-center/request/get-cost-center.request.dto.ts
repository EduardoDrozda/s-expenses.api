import { GetPaginationBaseDto } from "@application/dtos/base";

export class GetCostCenterRequestDto {
  companyId: string;
  params: GetPaginationBaseDto;
}