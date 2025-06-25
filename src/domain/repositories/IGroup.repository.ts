import { CreateGroupInput, DeleteGroupInput, GroupModel, UpdateGroupInput } from "@domain/models";

export const GROUP_REPOSITORY = Symbol('GROUP_REPOSITORY');

export interface IGroupRepository {
  create(data: CreateGroupInput): Promise<GroupModel>;
  update(data: UpdateGroupInput): Promise<GroupModel>;
  delete(data: DeleteGroupInput): Promise<void>;
  findById(id: string, companyId: string): Promise<GroupModel | null>;
  findAllByCompanyId(companyId: string): Promise<GroupModel[]>;
  findByName(name: string, companyId: string): Promise<GroupModel | null>;
}