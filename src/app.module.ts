import { EnviromentModule } from '@common/enviroment';
import { LoggerModule } from '@common/logger';
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { JwtModule } from '@common/jwt';
import { RepositoriesModule } from '@infrastructure/repositories/repositories.module';
import { UseCasesModule } from '@application/use-cases/use-cases.module';

@Module({
  imports: [
    EnviromentModule,
    JwtModule,
    LoggerModule,
    ApiModule,
    UseCasesModule,
    RepositoriesModule,
  ]
})
export class AppModule {}
