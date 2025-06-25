import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { CreateGroupRequestDto, GetGroupResponseDto } from "@application/dtos/group";
import { GROUP_REPOSITORY, IGroupRepository } from "@domain/repositories";
import { LoggerService } from "@common/logger";

@Injectable()
export class CreateGroupUseCase implements IBaseUseCase<CreateGroupRequestDto, GetGroupResponseDto> {
  constructor(
    @Inject(GROUP_REPOSITORY) private readonly groupRepository: IGroupRepository,
    private readonly loggerService: LoggerService
  ) {}
  
  async execute(data: CreateGroupRequestDto): Promise<GetGroupResponseDto> {
    this.loggerService.log(`Creating group with data: ${JSON.stringify(data)}`);

    const existingGroup = await this.groupRepository.findByName(data.name, data.companyId!);

    if (existingGroup) {
      this.loggerService.warn(`Group with name "${data.name}" already exists for company ID ${data.companyId}`);
      throw new ConflictException(`Group with name "${data.name}" already exists.`);
    }
    
    const group = await this.groupRepository.create({
      name: data.name,
      description: data.description ?? null,
      companyId: data.companyId!,
      createdById: data.createdBy!,
    });

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