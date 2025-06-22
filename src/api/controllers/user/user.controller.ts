import { CreateUserRequestDTO } from '@application/dtos/user/requests';
import { CreateUserUseCase, GetUserByIdUseCase } from '@application/use-cases/user';
import { RolesEnum } from '@domain/enums';
import { LoggedUser, LoggedUserInfo } from '@infrastructure/decorators/logged-user';
import { Roles } from '@infrastructure/decorators/role';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly createUserUseCase: CreateUserUseCase
  ) { }

  @Get("/me")
  async getLoggedUser(@LoggedUser() loggedUser: LoggedUserInfo) {
    const { id, company_id } = loggedUser;

    return this.getUserByIdUseCase.execute({
      id,
      company_id
    });
  }

  @Roles(RolesEnum.ADMIN)
  @Post()
  async createUser(
    @LoggedUser() loggerUser: LoggedUserInfo,
    @Body() createUserRequestDTO: CreateUserRequestDTO
  ) {
    const { company_id } = loggerUser;

    return this.createUserUseCase.execute({
      ...createUserRequestDTO,
      company_id,
      created_by: loggerUser.id
    });
  }
}
