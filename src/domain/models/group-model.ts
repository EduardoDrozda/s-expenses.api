import { Group } from "@prisma/client";

export type GroupModel = Group;

export type CreateGroupInput = Pick<GroupModel, 'name' | 'description' | 'companyId' | 'createdById'>;

export type UpdateGroupInput = Pick<GroupModel, 'id' | 'name' | 'description' | 'companyId' | 'updatedById'>;

export type DeleteGroupInput = Pick<GroupModel, 'id' | 'companyId' | 'deletedById'>;