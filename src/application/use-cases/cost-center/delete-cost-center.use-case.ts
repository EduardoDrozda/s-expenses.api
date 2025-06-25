import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { BaseDeleteRequestDto } from "@application/dtos/base/requests";
import { COST_CENTER_REPOSITORY, ICostCenterRepository } from "@application/repositories";
import { LoggerService } from "@common/logger";

@Injectable()
export class DeleteCostCenterUseCase implements IBaseUseCase<BaseDeleteRequestDto, void> {
  constructor(
    @Inject(COST_CENTER_REPOSITORY) private readonly costCenterRepository: ICostCenterRepository,
    private readonly logger: LoggerService
  ) {}

  async execute(data: BaseDeleteRequestDto): Promise<void> {
    this.logger.log(`Deleting cost center: ${data.id}`);

    const costCenter = await this.costCenterRepository.findById(data.id, data.companyId);

    if (!costCenter) {
      throw new NotFoundException("Cost center not found");
    }

    await this.costCenterRepository.delete({
      id: data.id,
      companyId: data.companyId,
      deletedById: data.deletedById
    });
  }
}
