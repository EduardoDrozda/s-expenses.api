import { IUserRepository, USER_REPOSITORY } from "@application/repositories";
import { LoggerService } from "@common/logger";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { RolesEnum } from "@domain/enums";
import { HashService } from "@common/hash";
import { CreateUserRequestDTO } from "@application/dtos/user/requests";


@Injectable()
export class CreateUserUseCase implements IBaseUseCase<CreateUserRequestDTO, void> {

  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly hashService: HashService,
    private readonly loggerService: LoggerService
  ) { }


  async execute(data: CreateUserRequestDTO): Promise<void> {
    this.loggerService.log(`Creating user with data: ${JSON.stringify(data)}`);

    const findedUser = await this.userRepository.findByEmail(data.email);

    if (findedUser) {
      this.loggerService.warn(`User with email ${data.email} already exists.`);
      throw new ConflictException("User already exists");
    }

    await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: await this.hashService.hash(data.password),
      phone: data.phone,
      company_id: data.company_id!,
      role: RolesEnum.USER,
      created_by: data.created_by,
    });
  }
}