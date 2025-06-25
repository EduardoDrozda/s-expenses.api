import { BaseResponseDto } from "@application/dtos/base";
import { GetProjectDto } from "@application/dtos/projects/response";

export type GetCostCenterGroupDto = BaseResponseDto & {
  name: string;
  description?: string | null;
  projects?: GetProjectDto[];
}