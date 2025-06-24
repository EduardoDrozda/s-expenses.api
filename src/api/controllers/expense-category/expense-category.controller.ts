import { GetPaginationBaseDto } from '@application/dtos/base';
import { CreateExpenseCategoryRequestDto, UpdateExpenseCategoryRequestDto } from '@application/dtos/expense-category/request';
import { CreateExpenseCategoryUseCase, DeleteByIdExpenseCategoryUseCase, GetAllExpenseCategoryUseCase, GetByIdExpenseCategoryUseCase } from '@application/use-cases/expense-category';
import { UpdateExpenseCategoryUseCase } from '@application/use-cases/expense-category/update-expense-category.use-case';
import { RolesEnum } from '@domain/enums';
import { LoggedUser, LoggedUserInfo } from '@infrastructure/decorators/logged-user';
import { Roles } from '@infrastructure/decorators/role';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Roles(RolesEnum.ADMIN)
@Controller('expense-categories')
export class ExpenseCategoryController {
  constructor(
    private readonly createExpenseCategoryUseCase: CreateExpenseCategoryUseCase,
    private readonly getExpenseCategoryUseCase: GetAllExpenseCategoryUseCase,
    private readonly getByIdExpenseCategoryUseCase: GetByIdExpenseCategoryUseCase,
    private readonly updateExpenseCategoryUseCase: UpdateExpenseCategoryUseCase,
    private readonly deleteExpenseCategoryUseCase: DeleteByIdExpenseCategoryUseCase
  ) { }

  @Post()
  async create(@LoggedUser() loggerUser: LoggedUserInfo, @Body() data: CreateExpenseCategoryRequestDto) {
    return this.createExpenseCategoryUseCase.execute({
      ...data,
      companyId: loggerUser.companyId,
      createdBy: loggerUser.id
    });
  }

  @Get()
  async findAll(@LoggedUser() loggerUser: LoggedUserInfo, @Query() searchParams: GetPaginationBaseDto) {
    return this.getExpenseCategoryUseCase.execute({
      companyId: loggerUser.companyId,
      params: searchParams
    });
  }

  @Get(':id')
  async findById(@LoggedUser() loggerUser: LoggedUserInfo, @Param('id') id: string) {
    console.log('Finding expense category by ID:', id);
    return this.getByIdExpenseCategoryUseCase.execute({
      id,
      companyId: loggerUser.companyId
    });
  }

  @Patch(':id')
  async update(
    @LoggedUser() loggerUser: LoggedUserInfo, 
    @Body() data: UpdateExpenseCategoryRequestDto,
    @Param('id') id: string
  ) {
    return this.updateExpenseCategoryUseCase.execute({
      ...data,
      id,
      companyId: loggerUser.companyId,
      updatedBy: loggerUser.id
    });
  }

  @Delete(':id')
  async delete(@LoggedUser() loggerUser: LoggedUserInfo, @Param('id') id: string) {
    return this.deleteExpenseCategoryUseCase.execute({
      id,
      companyId: loggerUser.companyId,
      deletedBy: loggerUser.id,
    });
  }
}
