import { IsOptional } from "class-validator";

export class BaseRequestDTO {
  created_by?: string;
  updated_by?: string;
  deleted_by?: string | null;
  company_id?: string;
}

export class GetPaginationBaseDto {
  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 10;

  @IsOptional()
  sort?: string;

  @IsOptional()
  order?: 'asc' | 'desc';

  @IsOptional()
  search?: string;

  @IsOptional()
  filter?: Record<string, any>;
}