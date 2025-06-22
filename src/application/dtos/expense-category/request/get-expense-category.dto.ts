import { GetPaginationBaseDto } from "@application/dtos/base";

export class GetExpenseCategoryRequestDto {
  company_id: string;
  params: GetPaginationBaseDto;
}