import { GetPaginationBaseDto } from "@application/dtos/base/requests";

export class GetExpenseCategoryRequestDto {
  companyId: string;
  params: GetPaginationBaseDto;
}