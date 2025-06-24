import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { DeleteByIdExpenseCategoryRequestDto } from "@application/dtos/expense-category/request";
import { CATEGORY_EXPENSE_REPOSITORY, ICategoryExpenseRepository } from "@application/repositories";
import { LoggerService } from "@common/logger";

@Injectable()
export class DeleteByIdExpenseCategoryUseCase implements IBaseUseCase<DeleteByIdExpenseCategoryRequestDto, void> {
  constructor(
    @Inject(CATEGORY_EXPENSE_REPOSITORY) private readonly categoryExpenseRepository: ICategoryExpenseRepository,
    private readonly loggerService: LoggerService
  ) {
    this.loggerService.context = this.constructor.name;
  }

  async execute(data: DeleteByIdExpenseCategoryRequestDto): Promise<void> {
    this.loggerService.log(`Deleting expense category with ID: ${data.id}`);

    const expenseCategory = await this
      .categoryExpenseRepository
      .findById(data.id, data.companyId!);

    if (!expenseCategory) {
      this.loggerService.warn(`Expense category with ID ${data.id} not found for company ID ${data.companyId}`);
      throw new NotFoundException(`Expense category with ID ${data.id} not found.`);
    }

    await this.categoryExpenseRepository.delete({
      id: data.id,
      companyId: data.companyId!,
      deletedById: data.deletedBy!,
    });
  }
}