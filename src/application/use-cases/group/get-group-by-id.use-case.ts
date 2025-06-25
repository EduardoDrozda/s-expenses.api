import { GetByIdRequestDto } from "@application/dtos/base/requests";
import { GROUP_REPOSITORY, IGroupRepository } from "@domain/repositories";
import { LoggerService } from "@common/logger";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { GetGroupResponseDto } from "@application/dtos/group";

@Injectable()
export class GetGroupByIdUseCase implements IBaseUseCase<GetByIdRequestDto, GetGroupResponseDto> {
  constructor(
   @Inject(GROUP_REPOSITORY) private readonly groupRepository: IGroupRepository,
   private readonly logger: LoggerService
  ) {}

  async execute(data: GetByIdRequestDto): Promise<GetGroupResponseDto> {
    this.logger.log(`Get group by id: ${data.id}`);

    const group = await this.groupRepository.findById(data.id, data.companyId);

    if (!group) {
      throw new NotFoundException("Group not found");
    }

    return {
      id: group.id,
      name: group.name,
      description: group.description,
      companyId: group.companyId,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    };
  }
} 