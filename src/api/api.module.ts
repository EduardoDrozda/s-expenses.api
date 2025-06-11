import { Module } from '@nestjs/common';
import { UseCasesModule } from '@application/use-cases/use-cases.module';
import { RepositoriesModule } from '@infrastructure/repositories/repositories.module';
import {
  AuthController,
  CompanyController,
  UserController
} from './controllers';

@Module({
  imports: [UseCasesModule, RepositoriesModule],
  controllers: [CompanyController, AuthController, UserController]
})
export class ApiModule { }
