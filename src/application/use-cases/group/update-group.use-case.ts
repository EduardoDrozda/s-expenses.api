import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { UpdateGroupRequestDto, GetGroupResponseDto } from "@application/dtos/group";
import { GROUP_REPOSITORY, IGroupRepository } from "@domain/repositories";
import { LoggerService } from "@common/logger";

@Injectable()
export class UpdateGroupUseCase implements IBaseUseCase<UpdateGroupRequestDto, GetGroupResponseDto> {
  constructor(
    @Inject(GROUP_REPOSITORY) private readonly groupRepository: IGroupRepository,
    private readonly logger: LoggerService
  ) {}

  async execute(data: UpdateGroupRequestDto): Promise<GetGroupResponseDto> {
    this.logger.log(`Updating group: ${data.id}`);

    const group = await this.groupRepository.findById(data.id, data.companyId);

    if (!group) {
      throw new NotFoundException("Group not found");
    }

    const updatedGroup = await this.groupRepository.update(data);

    return {
      id: updatedGroup.id,
      name: updatedGroup.name,
      description: updatedGroup.description,
      companyId: updatedGroup.companyId,
      createdAt: updatedGroup.createdAt,
      updatedAt: updatedGroup.updatedAt,
    };
  }
} 