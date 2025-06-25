import { Project } from "@prisma/client";

export type ProjectModel = Project;

export type CreateProjectInput = Pick<ProjectModel, 'name' | 'description' | 'companyId' | 'createdById'>;

export type UpdateProjectInput = Pick<ProjectModel, 'id' | 'name' | 'description' | 'companyId' | 'updatedById'>;

export type DeleteProjectInput = Pick<ProjectModel, 'id' | 'companyId' | 'deletedById'>; 