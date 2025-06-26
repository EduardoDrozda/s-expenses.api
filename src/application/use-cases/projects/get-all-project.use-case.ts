import { Inject, Injectable } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { PROJECT_REPOSITORY, IProjectRepository } from "@domain/repositories";
import { GetProjectResponseDto } from "@application/dtos/projects/response";
import { BaseResponseWithPaginationDto, GetPaginatedRequestDto } from "@application/dtos/base/requests";
import { PaginationHelper } from "@application/helpers/pagination.helper";
import { LoggerService } from "@common/logger";

@Injectable()
export class GetAllProjectUseCase implements IBaseUseCase<GetPaginatedRequestDto, BaseResponseWithPaginationDto<GetProjectResponseDto>> {
  constructor(
    @Inject(PROJECT_REPOSITORY) private readonly projectRepository: IProjectRepository,
    private readonly loggerService: LoggerService
  ) {
    this.loggerService.context = this.constructor.name;
  }

  async execute(data: GetPaginatedRequestDto): Promise<BaseResponseWithPaginationDto<GetProjectResponseDto>> {
    this.loggerService.log(`Getting all projects for company ${data.companyId}`);
    
    const { companyId, params } = data;
    const projects = await this.projectRepository.findAllByCompanyId(companyId);
    return PaginationHelper.paginate<GetProjectResponseDto>(projects, params.page!, params.limit!);
  }
} 