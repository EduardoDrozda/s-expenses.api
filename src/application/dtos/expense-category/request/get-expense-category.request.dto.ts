import { GetPaginationBaseDto } from "@application/dtos/base";

export class GetExpenseCategoryRequestDto {
  companyId: string;
  params: GetPaginationBaseDto;
}