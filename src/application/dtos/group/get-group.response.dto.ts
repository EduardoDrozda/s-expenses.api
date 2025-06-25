import { BaseResponseDto } from "@application/dtos/base/requests";

export type GetGroupResponseDto = BaseResponseDto & {
  id: string;
  name: string;
  description: string | null;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}; 