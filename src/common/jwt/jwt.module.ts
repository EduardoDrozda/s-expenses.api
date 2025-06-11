import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtModule as NestJwtModule, JwtService as NestJwtService } from '@nestjs/jwt';
import { EnviromentModule, EnviromentService } from '@common/enviroment';

@Module({
  imports: [
    NestJwtModule.registerAsync({
      imports: [EnviromentModule],
      useFactory: (envService: EnviromentService) => ({
        secret: envService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: envService.get('JWT_EXPIRES_IN'),
        }
      }),
      inject: [EnviromentService],
    }),
    EnviromentModule,
  ],
  providers: [{
    provide: JwtService,
    useFactory: (jwtService: NestJwtService, envService: EnviromentService) => new JwtService(
      {
        secret: envService.get('JWT_SECRET'),
      },
      jwtService,
    ),
    inject: [NestJwtService, EnviromentService],
  }],
  exports: [JwtService],
})
export class JwtModule {}
