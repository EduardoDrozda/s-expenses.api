import { Inject, Injectable } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { COST_CENTER_REPOSITORY, ICostCenterRepository } from "@domain/repositories";
import { GetCostCenterRequestDto } from "@application/dtos/cost-center/request/get-cost-center.request.dto";
import { BaseResponseWithPaginationDto } from "@application/dtos/base/requests";
import { LoggerService } from "@common/logger";
import { PaginationHelper } from "@application/helpers/pagination.helper";
import { GetCostCenterResponseDto } from "@application/dtos/cost-center/response";

@Injectable()
export class GetAllCostCenterUseCase
  implements IBaseUseCase<GetCostCenterRequestDto, BaseResponseWithPaginationDto<GetCostCenterResponseDto>> {

  constructor(
    @Inject(COST_CENTER_REPOSITORY) private readonly costCenterRepository: ICostCenterRepository,
    private readonly loggerService: LoggerService
  ) { }

  async execute(data: GetCostCenterRequestDto): Promise<BaseResponseWithPaginationDto<GetCostCenterResponseDto>> {
    const { companyId, params } = data;
    this.loggerService.log(`Fetching all cost centers for companyId: ${companyId}`);

    const costCenters = await this
      .costCenterRepository
      .findAllByCompanyId(companyId);

    return PaginationHelper.paginate<GetCostCenterResponseDto>(costCenters, params.page!, params.limit!);
  }

}