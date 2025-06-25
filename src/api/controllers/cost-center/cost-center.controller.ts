import { GetPaginationBaseDto } from '@application/dtos/base/requests';
import { CreateCostCenterRequestDto, UpdateCostCenterRequestDto } from '@application/dtos/cost-center/request';
import { CreateCostCenterUseCase } from '@application/use-cases/cost-center';
import { DeleteCostCenterUseCase } from '@application/use-cases/cost-center/delete-cost-center.use-case';
import { GetAllCostCenterUseCase } from '@application/use-cases/cost-center/get-all-cost-center.use-case';
import { GetCostCenterByIdUseCase } from '@application/use-cases/cost-center/get-cost-center-by-id.use-case';
import { UpdateCostCenterUseCase } from '@application/use-cases/cost-center/update-cost-center.use-case';
import { RolesEnum } from '@domain/enums';
import { LoggedUser, LoggedUserInfo } from '@infrastructure/decorators/logged-user';
import { Roles } from '@infrastructure/decorators/role';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('cost-centers')
export class CostCenterController {
  constructor(
    private readonly createCostCenterUseCase: CreateCostCenterUseCase,
    private readonly getAllCostCenterUseCase: GetAllCostCenterUseCase,
    private readonly getCostCenterByIdUseCase: GetCostCenterByIdUseCase,
    private readonly updateCostCenterUseCase: UpdateCostCenterUseCase,
    private readonly deleteCostCenterUseCase: DeleteCostCenterUseCase
  ) { }

  @Post()
  @Roles(RolesEnum.ADMIN)
  async createCostCenter(
    @LoggedUser() loggerUser: LoggedUserInfo,
    @Body() createCostCenterDto: CreateCostCenterRequestDto
  ) {
    return this.createCostCenterUseCase.execute({
      ...createCostCenterDto,
      companyId: loggerUser.companyId,
      createdBy: loggerUser.id
    });
  }

  @Get()
  @Roles(RolesEnum.ADMIN)
  async findAll(
    @LoggedUser() loggerUser: LoggedUserInfo,
    @Query() searchParams: GetPaginationBaseDto
  ) {
    return this.getAllCostCenterUseCase.execute({
      companyId: loggerUser.companyId,
      params: searchParams
    });
  }

  @Get(':id')
  @Roles(RolesEnum.ADMIN)
  async findById(@LoggedUser() loggerUser: LoggedUserInfo, @Param('id') id: string) {
    return this.getCostCenterByIdUseCase.execute({
      id,
      companyId: loggerUser.companyId
    });
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN)
  async updateCostCenter(
    @LoggedUser() loggerUser: LoggedUserInfo,
    @Param('id') id: string,
    @Body() updateCostCenterDto: UpdateCostCenterRequestDto
  ) {
    return this.updateCostCenterUseCase.execute({
      ...updateCostCenterDto,
      id,
      companyId: loggerUser.companyId,
      updatedById: loggerUser.id
    });
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN)
  async deleteCostCenter(
    @LoggedUser() loggerUser: LoggedUserInfo,
    @Param('id') id: string
  ) {
    return this.deleteCostCenterUseCase.execute({
      id,
      companyId: loggerUser.companyId,
      deletedById: loggerUser.id
    });
  }
}
