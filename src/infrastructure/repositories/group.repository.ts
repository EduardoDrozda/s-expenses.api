import { CreateGroupInput, GroupModel, UpdateGroupInput, DeleteGroupInput } from "@domain/models";
import { IGroupRepository } from "@domain/repositories";
import { DatabaseService } from "@infrastructure/database/database.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GroupRepository implements IGroupRepository {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateGroupInput): Promise<GroupModel> {
    return await this.databaseService.group.create({
      data: {
        ...data,
        createdById: data.createdById,
      }
    });
  }

  async update(data: UpdateGroupInput): Promise<GroupModel> {
    return await this.databaseService.group.update({
      where: { id: data.id },
      data: {
        ...data,
        updatedById: data.updatedById,
      }
    });
  }

  async findById(id: string, companyId: string): Promise<GroupModel | null> {
    return await this.databaseService.group.findUnique({
      where: { id, companyId },
    });
  }

  async findAllByCompanyId(companyId: string): Promise<GroupModel[]> {
    return await this.databaseService.group.findMany({
      where: { companyId },
    });
  }

  async findByName(name: string, companyId: string): Promise<GroupModel | null> {
    return await this.databaseService.group.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        companyId,
      },
    });
  }

  async delete(data: DeleteGroupInput): Promise<void> {
    await this.databaseService.group.update({
      where: { id: data.id, companyId: data.companyId },
      data: {
        deletedById: data.deletedById,
        deletedAt: new Date(),
      }
    });
  }
}