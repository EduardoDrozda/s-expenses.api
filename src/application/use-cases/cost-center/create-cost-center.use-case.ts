import { ConflictException, Inject, Injectable, NotImplementedException } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { CreateCostCenterRequestDto } from "@application/dtos/cost-center/request";
import { GetCenterCostDto } from "@application/dtos/cost-center/response/get-center-cost-dto";
import { COST_CENTER_REPOSITORY, ICostCenterRepository } from "@application/repositories";
import { LoggerService } from "@common/logger";

@Injectable()
export class CreateCostCenterUseCase implements IBaseUseCase<CreateCostCenterRequestDto, GetCenterCostDto> {
  constructor(
    @Inject(COST_CENTER_REPOSITORY) private readonly costCenterRepository: ICostCenterRepository,
    private readonly loggerService: LoggerService
  ) {}
  
  async execute(data: CreateCostCenterRequestDto): Promise<GetCenterCostDto> {
    this.loggerService.log(`Creating cost center with data: ${JSON.stringify(data)}`);

    const existingCostCenter = await this.costCenterRepository.findByName(data.name, data.companyId!);

    if (existingCostCenter) {
      this.loggerService.warn(`Cost center with name "${data.name}" already exists for company ID ${data.companyId}`);
      throw new ConflictException(`Cost center with name "${data.name}" already exists.`);
    }
    
    const costCenter = await this.costCenterRepository.create({
      name: data.name,
      company: {
        connect: {
          id: data.companyId!
        }
      },
      createdBy: {
        connect: {
          id: data.createdBy!
        }
      }
    });

    return {
      id: costCenter.id,
      name: costCenter.name,
      createdAt: costCenter.createdAt,
      updatedAt: costCenter.updatedAt,
    };
  }

}