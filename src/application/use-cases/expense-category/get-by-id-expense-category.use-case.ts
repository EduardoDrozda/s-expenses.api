import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { GetByIdExpenseCategoryRequestDto } from "@application/dtos/expense-category/request";
import { GetExpenseCategoryResponseDto } from "@application/dtos/expense-category/response";
import { CATEGORY_EXPENSE_REPOSITORY, ICategoryExpenseRepository } from "@domain/repositories";
import { LoggerService } from "@common/logger";

@Injectable()
export class GetByIdExpenseCategoryUseCase implements IBaseUseCase<GetByIdExpenseCategoryRequestDto, GetExpenseCategoryResponseDto> {
   constructor(
      @Inject(CATEGORY_EXPENSE_REPOSITORY) private readonly categoryExpenseRepository: ICategoryExpenseRepository,
      private readonly loggerService: LoggerService
    ) {
      this.loggerService.context = this.constructor.name;
     }

  async execute(request: GetByIdExpenseCategoryRequestDto): Promise<GetExpenseCategoryResponseDto> {
    this.loggerService.log(`Fetching expense category with ID: ${request.id}`);

    const expenseCategory = await this
      .categoryExpenseRepository
      .findById(request.id, request.companyId);

    if (!expenseCategory) {
      this.loggerService.warn(`Expense category with ID ${request.id} not found for company ID ${request.companyId}`);
      throw new NotFoundException(`Expense category with ID ${request.id} not found.`);
    }

    return expenseCategory;
  }
}