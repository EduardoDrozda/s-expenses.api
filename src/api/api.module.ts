import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company';
import { AuthController } from './controllers/auth/auth.controller';

@Module({
  controllers: [CompanyController, AuthController]
})
export class ApiModule {}
