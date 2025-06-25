import { BaseResponseDto } from "@application/dtos/base/requests";

export type GetProjectResponseDto = BaseResponseDto & {
  id: string;
  name: string;
  description: string | null;
  companyId: string;
}; 