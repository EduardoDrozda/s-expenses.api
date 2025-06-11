import { EnviromentModule } from '@common/enviroment';
import { LoggerModule } from '@common/logger';
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { JwtModule } from '@common/jwt';

@Module({
  imports: [
    EnviromentModule,
    JwtModule,
    LoggerModule,
    ApiModule,
  ]
})
export class AppModule {}
