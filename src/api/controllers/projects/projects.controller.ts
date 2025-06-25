import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProjectRequestDto, UpdateProjectRequestDto } from '@application/dtos/projects/requests';
import { CreateProjectUseCase, GetAllProjectUseCase, GetProjectByIdUseCase, UpdateProjectUseCase, DeleteProjectUseCase } from '@application/use-cases/projects';
import { RolesEnum } from '@domain/enums';
import { LoggedUser, LoggedUserInfo } from '@infrastructure/decorators/logged-user';
import { Roles } from '@infrastructure/decorators/role';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly getAllProjectUseCase: GetAllProjectUseCase,
    private readonly getProjectByIdUseCase: GetProjectByIdUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly deleteProjectUseCase: DeleteProjectUseCase
  ) {}

  @Post()
  @Roles(RolesEnum.ADMIN)
  async createProject(
    @LoggedUser() loggerUser: LoggedUserInfo,
    @Body() createProjectDto: CreateProjectRequestDto
  ) {
    return this.createProjectUseCase.execute({
      ...createProjectDto,
      companyId: loggerUser.companyId,
      createdBy: loggerUser.id
    });
  }

  @Get()
  @Roles(RolesEnum.ADMIN)
  async findAll(
    @LoggedUser() loggerUser: LoggedUserInfo
  ) {
    return this.getAllProjectUseCase.execute({
      companyId: loggerUser.companyId
    });
  }

  @Get(':id')
  @Roles(RolesEnum.ADMIN)
  async findById(@LoggedUser() loggerUser: LoggedUserInfo, @Param('id') id: string) {
    return this.getProjectByIdUseCase.execute({
      id,
      companyId: loggerUser.companyId
    });
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN)
  async updateProject(
    @LoggedUser() loggerUser: LoggedUserInfo,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectRequestDto
  ) {
    return this.updateProjectUseCase.execute({
      ...updateProjectDto,
      id,
      companyId: loggerUser.companyId,
      updatedById: loggerUser.id
    });
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN)
  async deleteProject(
    @LoggedUser() loggerUser: LoggedUserInfo,
    @Param('id') id: string
  ) {
    return this.deleteProjectUseCase.execute({
      id,
      companyId: loggerUser.companyId,
      deletedById: loggerUser.id
    });
  }
} 