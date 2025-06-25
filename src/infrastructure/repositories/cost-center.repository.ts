import { Injectable } from "@nestjs/common";
import { ICostCenterRepository } from "@application/repositories";
import { DatabaseService } from "@infrastructure/database/database.service";
import { CostCenterModel, UpdateCostCenterInput, DeleteCostCenterInput, CreateCostCenterInput } from "@domain/models";

@Injectable()
export class CostCenterRepository implements ICostCenterRepository {
  constructor(private readonly databaseService: DatabaseService) { }

  create(data: CreateCostCenterInput): Promise<CostCenterModel> {
    return this.databaseService.costCenter.create({
      data
    });
  }

  findAllByCompanyId(companyId: string): Promise<any[]> {
    return this.databaseService.costCenter.findMany({
      where: {
        companyId
      },
      include: {
        groups: {
          include: {
            projects: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findById(id: string, companyId: string): Promise<CostCenterModel | null> {
    return this.databaseService.costCenter.findUnique({
      where: {
        id,
        companyId
      }
    });
  }

  findByName(name: string, companyId: string): Promise<CostCenterModel | null> {
    return this.databaseService.costCenter.findFirst({
      where: {
        name,
        companyId
      }
    });
  }

  update(data: UpdateCostCenterInput): Promise<CostCenterModel> {
    const { id, companyId, updatedById, description} = data;

    return this.databaseService.costCenter.update({
      where: {
        id,
        companyId
      },
      data: {
        name: data.name,
        updatedById,
        description,
        updatedAt: new Date()
      },
    });
  }

  async delete(data: DeleteCostCenterInput): Promise<void> {
    const { id, companyId, deletedById } = data;

    await this.databaseService.costCenter.update({
      where: {
        id,
        companyId
      },
      data: {
        deletedAt: new Date(),
        deletedById
      }
    });
  }
}