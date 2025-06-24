import { ICategoryExpenseRepository } from "@application/repositories";

import {
  CreateCategoryExpensesInput,
  CategoryExpensesModel,
  UpdateCategoryExpensesInput,
  DeleteCategoryExpensesInput
} from "@domain/models";
import { DatabaseService } from "@infrastructure/database/database.service";

import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryExpenseRepository implements ICategoryExpenseRepository {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(data: CreateCategoryExpensesInput): Promise<CategoryExpensesModel> {
    const { name, color, description, icon, companyId, createdById } = data;
    return this.databaseService.categoryExpense.create({
      data: {
        name,
        color,
        description,
        icon,
        companyId,
        createdById,
      }
    });
  }

  findAllByCompanyId(companyId: string): Promise<CategoryExpensesModel[]> {
    return this.databaseService.categoryExpense.findMany({
      where: {
        companyId: companyId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findById(id: string, companyId: string): Promise<CategoryExpensesModel | null> {
    return this.databaseService.categoryExpense.findFirst({
      where: {
        id,
        companyId: companyId,
      },
    });
  }

  findByName(name: string, companyId: string): Promise<CategoryExpensesModel | null> {
    return this.databaseService.categoryExpense.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        companyId: companyId,
      },
    });
  }

  async update(data: UpdateCategoryExpensesInput): Promise<CategoryExpensesModel> {
    const { name, color, description, icon, updatedById } = data;

    return this.databaseService.categoryExpense.update({
      where: {
        id: data.id,
      },
      data: {
        name,
        color,
        description,
        icon,
        updatedById,
      },
    })
  }

  async delete(data: DeleteCategoryExpensesInput): Promise<void> {
    const { id, deletedById } = data;

    await this.databaseService.categoryExpense.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        deletedById,
      },
    });
  }
}