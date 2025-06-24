import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { UpdateExpenseCategoryRequestDto } from "@application/dtos/expense-category/request";
import { CATEGORY_EXPENSE_REPOSITORY, ICategoryExpenseRepository } from "@application/repositories";
import { LoggerService } from "@common/logger";
import { GetExpenseCategoryResponseDto } from "@application/dtos/expense-category/response";

@Injectable()
export class UpdateExpenseCategoryUseCase implements IBaseUseCase<UpdateExpenseCategoryRequestDto, GetExpenseCategoryResponseDto> {
  constructor(
    @Inject(CATEGORY_EXPENSE_REPOSITORY) private readonly categoryExpenseRepository: ICategoryExpenseRepository,
    private readonly loggerService: LoggerService
  ) {
    this.loggerService.context = this.constructor.name;
  }

  async execute(request: UpdateExpenseCategoryRequestDto): Promise<GetExpenseCategoryResponseDto> {
    this.loggerService.log(`Updating expense category with ID: ${request.id}`);

    const existingCategory = await this
      .categoryExpenseRepository
      .findById(request.id, request.companyId);

    if (!existingCategory) {
      this.loggerService.warn(`Expense category with ID ${request.id} not found for company ID ${request.companyId}`);
      throw new NotFoundException(`Expense category with ID ${request.id} not found.`);
    }

    const result = await this.categoryExpenseRepository.update({
      id: request.id,
      name: request.name!,
      description: request.description!,
      icon: request.icon!,
      color: request.color!,
      companyId: request.companyId,
      updatedById: request.updatedBy
    });

    this.loggerService.log(`Expense category with ID ${request.id} updated successfully.`);

    return result;
  }
}