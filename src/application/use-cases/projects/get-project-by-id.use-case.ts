import { GetByIdRequestDto } from "@application/dtos/base/requests";
import { PROJECT_REPOSITORY, IProjectRepository } from "@domain/repositories";
import { LoggerService } from "@common/logger";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { GetProjectResponseDto } from "@application/dtos/projects/response";

@Injectable()
export class GetProjectByIdUseCase implements IBaseUseCase<GetByIdRequestDto, GetProjectResponseDto> {
  constructor(
   @Inject(PROJECT_REPOSITORY) private readonly projectRepository: IProjectRepository,
   private readonly logger: LoggerService
  ) {}

  async execute(data: GetByIdRequestDto): Promise<GetProjectResponseDto> {
    this.logger.log(`Get project by id: ${data.id}`);

    const project = await this.projectRepository.findById(data.id, data.companyId);

    if (!project) {
      throw new NotFoundException("Project not found");
    }

    return {
      id: project.id,
      name: project.name,
      description: project.description,
      companyId: project.companyId,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }
} 