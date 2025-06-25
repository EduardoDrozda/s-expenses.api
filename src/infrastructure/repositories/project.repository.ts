import { CreateProjectInput, ProjectModel, UpdateProjectInput, DeleteProjectInput } from "@domain/models";
import { IProjectRepository } from "@domain/repositories";
import { DatabaseService } from "@infrastructure/database/database.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateProjectInput): Promise<ProjectModel> {
    return await this.databaseService.project.create({
      data: {
        ...data,
        createdById: data.createdById,
      }
    });
  }

  async update(data: UpdateProjectInput): Promise<ProjectModel> {
    return await this.databaseService.project.update({
      where: { id: data.id },
      data: {
        ...data,
        updatedById: data.updatedById,
      }
    });
  }

  async findById(id: string, companyId: string): Promise<ProjectModel | null> {
    return await this.databaseService.project.findFirst({
      where: { id, companyId },
    });
  }

  async findAllByCompanyId(companyId: string): Promise<ProjectModel[]> {
    return await this.databaseService.project.findMany({
      where: { companyId },
    });
  }

  async findByName(name: string, companyId: string): Promise<ProjectModel | null> {
    return await this.databaseService.project.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        companyId,
      },
    });
  }

  async delete(data: DeleteProjectInput): Promise<void> {
    await this.databaseService.project.update({
      where: { id: data.id },
      data: {
        deletedAt: new Date(),
        deletedById: data.deletedById,
      },
    });
  }
} 