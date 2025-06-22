import { AuditableModel, BaseModel } from "./base-model";

export type CategoryExpensesModel = {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  company_id: string;
} & AuditableModel;

export type CreateCategoryExpensesInput = Omit<CategoryExpensesModel, 'id' | 'created_at' | 'updated_at'>;

export type UpdateCategoryExpensesInput = Partial<CreateCategoryExpensesInput> & Pick<CategoryExpensesModel, 'id' | 'company_id'>;

export type DeleteCategoryExpensesInput = Pick<CategoryExpensesModel, 'id' | 'company_id' | 'deleted_by'>;