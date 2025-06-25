import { GetByIdRequestDto } from "@application/dtos/base/requests";
import { COST_CENTER_REPOSITORY, ICostCenterRepository } from "@domain/repositories";
import { LoggerService } from "@common/logger";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { GetCostCenterResponseDto } from "@application/dtos/cost-center/response";

@Injectable()
export class GetCostCenterByIdUseCase implements IBaseUseCase<GetByIdRequestDto, GetCostCenterResponseDto>{
  constructor(
   @Inject(COST_CENTER_REPOSITORY) private readonly costCenterRepository: ICostCenterRepository,
   private readonly logger: LoggerService
  ) {}

  async execute(data: GetByIdRequestDto): Promise<GetCostCenterResponseDto> {
    this.logger.log(`Get cost center by id: ${data.id}`);

    const costCenter = await this.costCenterRepository.findById(data.id, data.companyId);

    if (!costCenter) {
      throw new NotFoundException("Cost center not found");
    }

    return {
      id: costCenter.id,
      name: costCenter.name,
      description: costCenter.description,
      createdAt: costCenter.createdAt,
      updatedAt: costCenter.updatedAt,
    };

  }
}