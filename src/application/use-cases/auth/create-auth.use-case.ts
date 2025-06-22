import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { IUserRepository, USER_REPOSITORY } from "@application/repositories";
import { HashService } from "@common/hash";
import { JwtService } from "@common/jwt";
import { LoggerService } from "@common/logger";
import { CreateAuthRequestDTO } from "@application/dtos/auth/requests";
import { GetAuthResponseDTO } from "@application/dtos/auth/responses";

@Injectable()
export class CreateAuthUseCase implements IBaseUseCase<CreateAuthRequestDTO, GetAuthResponseDTO> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService
  ) { }

  async execute(data: CreateAuthRequestDTO): Promise<GetAuthResponseDTO> {
    this.loggerService.context = CreateAuthUseCase.name;
    this.loggerService.log("Executing...");

    const { email, password } = data;
    const existingUser = await this.userRepository.findByEmail(email);

    if (!existingUser || !(await this.hashService.compare(password, existingUser.password))) {
      this.loggerService.error("Invalid email or password");
      throw new UnauthorizedException("Invalid email or password");
    }

    const token = await this
      .jwtService
      .sign({
        id: existingUser.id,
        company_id: existingUser.company_id,
        role: existingUser.role
      })

    return {
      token,
      type: "Bearer"
    }
  }
}