import { Module } from '@nestjs/common';
import { UseCasesModule } from '@application/use-cases';
import { RepositoriesModule } from '@infrastructure/repositories';
import {
  AuthController,
  CompanyController,
  CostCenterController,
  ExpenseCategoryController,
  ExpenseController,
  GroupController,
  UserController
} from './controllers';

@Module({
  imports: [UseCasesModule, RepositoriesModule],
  controllers: [
    CompanyController,
    AuthController,
    UserController,
    ExpenseCategoryController,
    ExpenseController,
    CostCenterController,
    GroupController
  ]
})
export class ApiModule { }
