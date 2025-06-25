import { Module } from '@nestjs/common';
import { UseCasesModule } from '@application/use-cases';
import { RepositoriesModule } from '@infrastructure/repositories';
import {
  AuthController,
  CompanyController,
  CostCenterController,
  ExpenseCategoryController,
  ExpenseController,
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
  ]
})
export class ApiModule { }
