import {
  CategoryExpensesModel,
  CreateCategoryExpensesInput,
  DeleteCategoryExpensesInput,
  UpdateCategoryExpensesInput
} from "@domain/models";

export const CATEGORY_EXPENSE_REPOSITORY = Symbol('ICategoryExpenseRepository');

export interface ICategoryExpenseRepository {
  create(data: CreateCategoryExpensesInput): Promise<CategoryExpensesModel>;
  findAllByCompanyId(company_id: string): Promise<CategoryExpensesModel[]>;
  findById(id: string, company_id: string): Promise<CategoryExpensesModel | undefined>;
  findByName(name: string, companyId: string): Promise<CategoryExpensesModel | undefined>;
  update(data: UpdateCategoryExpensesInput): Promise<CategoryExpensesModel>;
  delete(data: DeleteCategoryExpensesInput): Promise<void>;
}