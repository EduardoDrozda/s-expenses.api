import { BaseResponseDto } from "@application/dtos/base";
import { GetCostCenterGroupDto } from "@application/dtos/cost-center-group/response";


export type GetCenterCostDto = BaseResponseDto & {
  name: string;
  description?: string;
  costCenterGroups?: GetCostCenterGroupDto[];
}