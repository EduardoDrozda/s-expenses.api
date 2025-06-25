import { GetPaginationBaseDto } from "@application/dtos/base/requests";

export class GetCostCenterRequestDto {
  companyId: string;
  params: GetPaginationBaseDto;
}