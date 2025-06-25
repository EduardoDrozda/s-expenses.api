import { Inject, Injectable } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { CATEGORY_EXPENSE_REPOSITORY, ICategoryExpenseRepository } from "@application/repositories";
import { LoggerService } from "@common/logger";
import { GetExpenseCategoryResponseDto } from "@application/dtos/expense-category/response";
import { BaseResponseWithPaginationDto } from "@application/dtos/base";
import { PaginationHelper } from "@application/helpers/pagination.helper";
import { GetExpenseCategoryRequestDto } from "@application/dtos/expense-category/request/get-expense-category.request.dto";

@Injectable()
export class GetAllExpenseCategoryUseCase
  implements IBaseUseCase<GetExpenseCategoryRequestDto, BaseResponseWithPaginationDto<GetExpenseCategoryResponseDto>> {
  constructor(
    @Inject(CATEGORY_EXPENSE_REPOSITORY) private readonly categoryExpenseRepository: ICategoryExpenseRepository,
    private readonly loggerService: LoggerService
  ) {
    this.loggerService.context = this.constructor.name;
  }

  async execute(data: GetExpenseCategoryRequestDto) {
    const { companyId, params } = data;
    this.loggerService.log(`Fetching all expense categories for companyId: ${companyId}`);

    const categories = await this.categoryExpenseRepository.findAllByCompanyId(companyId);

    return PaginationHelper
      .paginate<GetExpenseCategoryResponseDto>(categories, params.page!, params.limit!);
  }
}