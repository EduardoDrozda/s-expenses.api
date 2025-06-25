import { Inject, Injectable } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { GROUP_REPOSITORY, IGroupRepository } from "@domain/repositories";
import { GetGroupResponseDto } from "@application/dtos/group";
import { BaseResponseWithPaginationDto, GetPaginatedRequestDto } from "@application/dtos/base/requests";
import { LoggerService } from "@common/logger";
import { PaginationHelper } from "@application/helpers/pagination.helper";
import { GetExpenseCategoryResponseDto } from "@application/dtos/expense-category/response";

@Injectable()
export class GetAllGroupUseCase implements IBaseUseCase<GetPaginatedRequestDto, BaseResponseWithPaginationDto<GetExpenseCategoryResponseDto>> {
  constructor(
    @Inject(GROUP_REPOSITORY) private readonly groupRepository: IGroupRepository,
    private readonly loggerService: LoggerService
  ) { }

  async execute(data: GetPaginatedRequestDto): Promise<BaseResponseWithPaginationDto<GetExpenseCategoryResponseDto>> {
    const { companyId, params } = data;
    
    this.loggerService.log(`Fetching all groups for companyId: ${companyId}`);

    const groups = await this.groupRepository.findAllByCompanyId(companyId);

    return PaginationHelper
      .paginate<GetExpenseCategoryResponseDto>(groups, params.page!, params.limit!);
  }
} 