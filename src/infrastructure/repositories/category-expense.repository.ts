import { ICategoryExpenseRepository } from "@application/repositories";

import {
  CreateCategoryExpensesInput,
  CategoryExpensesModel,
  UpdateCategoryExpensesInput,
  DeleteCategoryExpensesInput
} from "@domain/models";

import { knex } from "@infrastructure/database";
import { Injectable } from "@nestjs/common";
import { Knex } from "knex";

@Injectable()
export class CategoryExpenseRepository implements ICategoryExpenseRepository {
  private readonly database: Knex = knex;

  async create(data: CreateCategoryExpensesInput): Promise<CategoryExpensesModel> {
    const { name, company_id, color, description, icon, created_by } = data;

    const [categoryExpense] = await this.database('categories_expenses')
      .insert({
        name,
        company_id,
        color,
        description,
        icon,
        created_by: created_by!,
      })
      .returning('*');

    return categoryExpense
  }

  findAllByCompanyId(company_id: string): Promise<CategoryExpensesModel[]> {
    return this.database('categories_expenses')
      .where({ company_id })
      .whereNull('deleted_at')
      .select('*');
  }

  findById(id: string, company_id: string): Promise<CategoryExpensesModel | undefined> {
    return this.database('categories_expenses')
      .where({ id, company_id })
      .whereNull('deleted_at')
      .first();
  }

  findByName(name: string, company_id: string): Promise<CategoryExpensesModel | undefined> {
    return this.database('categories_expenses')
      .where({ name, company_id })
      .whereNull('deleted_at')
      .first();
  }

  async update(data: UpdateCategoryExpensesInput): Promise<CategoryExpensesModel> {
    const { name, color, description, icon, updated_by } = data;

    const [categoryExpense] = await this.database('categories_expenses')
      .where({ id: data.id, company_id: data.company_id })
      .update({ name, color, description, icon, updated_by: updated_by! })
      .returning('*')

    return categoryExpense;
  }

  async delete(data: DeleteCategoryExpensesInput): Promise<void> {
    const { id, company_id, deleted_by } = data;

    await this.database('categories_expenses')
      .where({ id, company_id })
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: deleted_by!,
      });
  }
}