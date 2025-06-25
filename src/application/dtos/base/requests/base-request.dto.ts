import { IsOptional } from "class-validator";

export class BaseRequestDTO {
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
  companyId: string | null;
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