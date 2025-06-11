import { EnviromentModule } from '@common/enviroment';
import { LoggerModule } from '@common/logger';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    EnviromentModule,
    LoggerModule,
  ]
})
export class AppModule {}
