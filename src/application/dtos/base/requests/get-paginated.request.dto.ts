import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { GetPaginationBaseDto } from "./base-request.dto";

export class GetPaginatedRequestDto {
  companyId: string;
  params: GetPaginationBaseDto;
}