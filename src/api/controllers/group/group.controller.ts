import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateGroupRequestDto, UpdateGroupRequestDto } from '@application/dtos/group';
import { CreateGroupUseCase } from '@application/use-cases/group/create-group.use-case';
import { GetAllGroupUseCase } from '@application/use-cases/group/get-all-group.use-case';
import { GetGroupByIdUseCase } from '@application/use-cases/group/get-group-by-id.use-case';
import { UpdateGroupUseCase } from '@application/use-cases/group/update-group.use-case';
import { DeleteGroupUseCase } from '@application/use-cases/group/delete-group.use-case';
import { RolesEnum } from '@domain/enums';
import { LoggedUser, LoggedUserInfo } from '@infrastructure/decorators/logged-user';
import { Roles } from '@infrastructure/decorators/role';
import { GetPaginationBaseDto } from '@application/dtos/base/requests';

@Controller('groups')
export class GroupController {
  constructor(
    private readonly createGroupUseCase: CreateGroupUseCase,
    private readonly getAllGroupUseCase: GetAllGroupUseCase,
    private readonly getGroupByIdUseCase: GetGroupByIdUseCase,
    private readonly updateGroupUseCase: UpdateGroupUseCase,
    private readonly deleteGroupUseCase: DeleteGroupUseCase
  ) {}

  @Post()
  @Roles(RolesEnum.ADMIN)
  async createGroup(
    @LoggedUser() loggerUser: LoggedUserInfo,
    @Body() createGroupDto: CreateGroupRequestDto
  ) {
    return this.createGroupUseCase.execute({
      ...createGroupDto,
      companyId: loggerUser.companyId,
      createdBy: loggerUser.id
    });
  }

  @Get()
  @Roles(RolesEnum.ADMIN)
  async findAll(
    @LoggedUser() loggerUser: LoggedUserInfo, 
    @Query() searchParams: GetPaginationBaseDto
  )  {
    return this.getAllGroupUseCase.execute({
      companyId: loggerUser.companyId,
      params: searchParams
    });
  }

  @Get(':id')
  @Roles(RolesEnum.ADMIN)
  async findById(@LoggedUser() loggerUser: LoggedUserInfo, @Param('id') id: string) {
    return this.getGroupByIdUseCase.execute({
      id,
      companyId: loggerUser.companyId
    });
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN)
  async updateGroup(
    @LoggedUser() loggerUser: LoggedUserInfo,
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupRequestDto
  ) {
    return this.updateGroupUseCase.execute({
      ...updateGroupDto,
      id,
      companyId: loggerUser.companyId,
      updatedById: loggerUser.id
    });
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN)
  async deleteGroup(
    @LoggedUser() loggerUser: LoggedUserInfo,
    @Param('id') id: string
  ) {
    return this.deleteGroupUseCase.execute({
      id,
      companyId: loggerUser.companyId,
      deletedById: loggerUser.id
    });
  }
}
