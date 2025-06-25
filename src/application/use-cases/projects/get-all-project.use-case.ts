import { Inject, Injectable } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { PROJECT_REPOSITORY, IProjectRepository } from "@domain/repositories";
import { GetProjectResponseDto } from "@application/dtos/projects/response";

@Injectable()
export class GetAllProjectUseCase implements IBaseUseCase<{ companyId: string }, GetProjectResponseDto[]> {
  constructor(
    @Inject(PROJECT_REPOSITORY) private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(data: { companyId: string }): Promise<GetProjectResponseDto[]> {
    const projects = await this.projectRepository.findAllByCompanyId(data.companyId);
    return projects.map(project => ({
      id: project.id,
      name: project.name,
      description: project.description,
      companyId: project.companyId,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));
  }
} 