import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { DeleteGroupRequestDto } from "@application/dtos/group";
import { GROUP_REPOSITORY, IGroupRepository } from "@domain/repositories";
import { LoggerService } from "@common/logger";

@Injectable()
export class DeleteGroupUseCase implements IBaseUseCase<DeleteGroupRequestDto, void> {
  constructor(
    @Inject(GROUP_REPOSITORY) private readonly groupRepository: IGroupRepository,
    private readonly logger: LoggerService
  ) {}

  async execute(data: DeleteGroupRequestDto): Promise<void> {
    this.logger.log(`Deleting group: ${data.id}`);

    const group = await this.groupRepository.findById(data.id, data.companyId);

    if (!group) {
      throw new NotFoundException("Group not found");
    }

    await this.groupRepository.delete({
      id: data.id,
      companyId: data.companyId,
      deletedById: data.deletedById
    });
  }
} 