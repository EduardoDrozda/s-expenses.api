import { IBaseUseCase } from "../IBase.use-case";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { CATEGORY_EXPENSE_REPOSITORY, ICategoryExpenseRepository } from "@domain/repositories";
import { LoggerService } from "@common/logger";
import { CreateExpenseCategoryRequestDto } from "@application/dtos/expense-category/request";
import { GetExpenseCategoryResponseDto } from "@application/dtos/expense-category/response";

@Injectable()
export class CreateExpenseCategoryUseCase implements IBaseUseCase<CreateExpenseCategoryRequestDto, GetExpenseCategoryResponseDto> {

  constructor(
    @Inject(CATEGORY_EXPENSE_REPOSITORY) private readonly categoryExpenseRepository: ICategoryExpenseRepository,
    private readonly loggerService: LoggerService
  ) {
    this.loggerService.context = this.constructor.name;
  }

  async execute(data: CreateExpenseCategoryRequestDto): Promise<GetExpenseCategoryResponseDto> {
    this.loggerService.log(`Creating expense category with data: ${JSON.stringify(data)}`);

    const existingCategory = await this.categoryExpenseRepository.findByName(data.name, data.companyId);

    if (existingCategory) {
      this.loggerService.warn(`Expense category with name "${data.name}" already exists for company ID ${data.companyId}`);
      throw new ConflictException(`Expense category with name "${data.name}" already exists.`);
    }

    return this.categoryExpenseRepository.create({
      name: data.name,
      description: data.description,
      icon: data.icon,
      color: data.color,
      companyId: data.companyId,
      createdById: data.createdBy
    });
  }
}