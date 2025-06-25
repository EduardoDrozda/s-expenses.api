import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { DeleteProjectRequestDto } from "@application/dtos/projects/requests";
import { PROJECT_REPOSITORY, IProjectRepository } from "@domain/repositories";
import { LoggerService } from "@common/logger";

@Injectable()
export class DeleteProjectUseCase implements IBaseUseCase<DeleteProjectRequestDto, void> {
  constructor(
    @Inject(PROJECT_REPOSITORY) private readonly projectRepository: IProjectRepository,
    private readonly logger: LoggerService
  ) {}

  async execute(data: DeleteProjectRequestDto): Promise<void> {
    this.logger.log(`Deleting project: ${data.id}`);

    const project = await this.projectRepository.findById(data.id, data.companyId);

    if (!project) {
      throw new NotFoundException("Project not found");
    }

    await this.projectRepository.delete({
      id: data.id,
      companyId: data.companyId,
      deletedById: data.deletedById
    });
  }
} 