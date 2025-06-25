import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { CreateProjectRequestDto } from "@application/dtos/projects/requests";
import { GetProjectResponseDto } from "@application/dtos/projects/response";
import { PROJECT_REPOSITORY, IProjectRepository } from "@domain/repositories";
import { LoggerService } from "@common/logger";

@Injectable()
export class CreateProjectUseCase implements IBaseUseCase<CreateProjectRequestDto, GetProjectResponseDto> {
  constructor(
    @Inject(PROJECT_REPOSITORY) private readonly projectRepository: IProjectRepository,
    private readonly loggerService: LoggerService
  ) {}
  
  async execute(data: CreateProjectRequestDto): Promise<GetProjectResponseDto> {
    this.loggerService.log(`Creating project with data: ${JSON.stringify(data)}`);

    const existingProject = await this.projectRepository.findByName(data.name, data.companyId!);

    if (existingProject) {
      this.loggerService.warn(`Project with name "${data.name}" already exists for company ID ${data.companyId}`);
      throw new ConflictException(`Project with name "${data.name}" already exists.`);
    }
    
    const project = await this.projectRepository.create({
      name: data.name,
      description: data.description ?? null,
      companyId: data.companyId!,
      createdById: data.createdBy!,
    });

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