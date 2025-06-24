import {
  CategoryExpensesModel,
  CreateCategoryExpensesInput,
  DeleteCategoryExpensesInput,
  UpdateCategoryExpensesInput
} from "@domain/models";

export const CATEGORY_EXPENSE_REPOSITORY = Symbol('ICategoryExpenseRepository');

export interface ICategoryExpenseRepository {
  create(data: CreateCategoryExpensesInput): Promise<CategoryExpensesModel>;
  findAllByCompanyId(companyId: string): Promise<CategoryExpensesModel[]>;
  findById(id: string, companyId: string): Promise<CategoryExpensesModel | null>;
  findByName(name: string, companyId: string): Promise<CategoryExpensesModel | null>;
  update(data: UpdateCategoryExpensesInput): Promise<CategoryExpensesModel>;
  delete(data: DeleteCategoryExpensesInput): Promise<void>;
}