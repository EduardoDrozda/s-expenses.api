import { GetUserByIdUseCase } from '@application/use-cases/user';
import { LoggedUser, LoggedUserInfo } from '@infrastructure/decorators/logged-user';
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(
    private readonly getUserByIdUseCase: GetUserByIdUseCase
  ) { }

  @Get("/me")
  async getLoggedUser(@LoggedUser() loggedUser: LoggedUserInfo) {
    const { id, company_id } = loggedUser;
    
    return this.getUserByIdUseCase.execute({
      id,
      company_id
    });
  }
}
