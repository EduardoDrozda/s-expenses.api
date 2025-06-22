import { Module } from '@nestjs/common';
import { UseCasesModule } from '@application/use-cases';
import { RepositoriesModule } from '@infrastructure/repositories';
import {
  AuthController,
  CompanyController,
  ExpenseController,
  UserController
} from './controllers';
import { ExpenseCategoryController } from './controllers/expense-category/expense-category.controller';

@Module({
  imports: [UseCasesModule, RepositoriesModule],
  controllers: [
    CompanyController, 
    AuthController, 
    UserController,
    ExpenseCategoryController,
    ExpenseController
  ]
})
export class ApiModule { }
