import { BaseResponseDto } from "@application/dtos/base/requests";


export type GetCostCenterResponseDto = BaseResponseDto & {
  name: string;
  description: string | null;
}