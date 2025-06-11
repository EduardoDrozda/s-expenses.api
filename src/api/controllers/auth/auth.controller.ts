import { CreateAuthDTO } from '@application/dtos/auth';
import { CreateAuthUseCase } from '@application/use-cases/auth';
import { IsPublic } from '@common/jwt';
import { Body, Controller, Post } from '@nestjs/common';

@Controller()
export class AuthController {

  constructor(private readonly createAuthUseCase: CreateAuthUseCase) {}

  @IsPublic()
  @Post('/login')
  async login(@Body() createAuthDto: CreateAuthDTO) {
    return this.createAuthUseCase.execute(createAuthDto);
  }
}
