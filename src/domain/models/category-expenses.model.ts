import { CategoryExpense, Prisma } from "@prisma/client";

export type CategoryExpensesModel = CategoryExpense;

export type CreateCategoryExpensesInput = Omit<CategoryExpensesModel, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'updatedById' | 'deletedById'>;

export type UpdateCategoryExpensesInput = Pick<CategoryExpensesModel,  'id' | 'name' | 'description' | 'color' | 'icon' | 'companyId' | 'updatedById'>;

export type DeleteCategoryExpensesInput = Pick<CategoryExpensesModel, 'id' | 'companyId' | 'deletedById'>;