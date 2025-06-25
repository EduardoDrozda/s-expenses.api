import { GetPaginationBaseDto } from '@application/dtos/base/requests';
import { CreateCostCenterRequestDto } from '@application/dtos/cost-center/request';
import { GetCenterCostDto } from '@application/dtos/cost-center/response/get-center-cost-dto';
import { CreateCostCenterUseCase } from '@application/use-cases/cost-center';
import { GetAllCostCenterUseCase } from '@application/use-cases/cost-center/get-all-cost-center.use-case';
import { GetCostCenterByIdUseCase } from '@application/use-cases/cost-center/get-cost-center-by-id.use-case';
import { RolesEnum } from '@domain/enums';
import { LoggedUser, LoggedUserInfo } from '@infrastructure/decorators/logged-user';
import { Roles } from '@infrastructure/decorators/role';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('cost-centers')
export class CostCenterController {
  constructor(
    private readonly createCostCenterUseCase: CreateCostCenterUseCase,
    private readonly getAllCostCenterUseCase: GetAllCostCenterUseCase,
    private readonly getCostCenterByIdUseCase: GetCostCenterByIdUseCase
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

}
