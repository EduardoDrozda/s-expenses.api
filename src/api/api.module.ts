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
  ProjectController,
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
    GroupController,
    ProjectController
  ]
})
export class ApiModule { }
