import { CreateProjectInput, UpdateProjectInput, DeleteProjectInput, ProjectModel } from "@domain/models";

export const PROJECT_REPOSITORY = Symbol('PROJECT_REPOSITORY');

export interface IProjectRepository {
  create(data: CreateProjectInput): Promise<ProjectModel>;
  update(data: UpdateProjectInput): Promise<ProjectModel>;
  delete(data: DeleteProjectInput): Promise<void>;
  findById(id: string, companyId: string): Promise<ProjectModel | null>;
  findAllByCompanyId(companyId: string): Promise<ProjectModel[]>;
  findByName(name: string, companyId: string): Promise<ProjectModel | null>;
} 