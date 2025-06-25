import { BaseResponseDto } from "@application/dtos/base/requests";
import { GetCostCenterGroupDto } from "@application/dtos/cost-center-group/response";


export type GetCenterCostDto = BaseResponseDto & {
  name: string;
  description?: string | null;
}