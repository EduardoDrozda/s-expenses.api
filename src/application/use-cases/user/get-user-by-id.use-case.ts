import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";

import {
  COMPANY_REPOSITORY,
  ICompanyRepository,
  IUserRepository,
  USER_REPOSITORY
} from "@domain/repositories";

import { LoggerService } from "@common/logger";
import { GetUserByIdRequestDTO } from "@application/dtos/user/requests";
import { GetUserResponseDTO } from "@application/dtos/user/responses/get-user-response.dto";

@Injectable()
export class GetUserByIdUseCase implements IBaseUseCase<GetUserByIdRequestDTO, GetUserResponseDTO> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(COMPANY_REPOSITORY) private readonly companyRepository: ICompanyRepository,
    private readonly loggerService: LoggerService
  ) { }

  async execute(data: GetUserByIdRequestDTO): Promise<GetUserResponseDTO> {
    const { companyId, id } = data;
    this.loggerService.log(`Executing GetUserByIdUseCase with data: ${JSON.stringify(data)}`);

    const userPromise = this.userRepository.findById(id);
    const companyPromise = this.companyRepository.findById(companyId);

    const [user, company] = await Promise.all([userPromise, companyPromise]);

    if (!user || !company) {
      this.loggerService.warn(`User found`);
      throw new NotFoundException(`User found`);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      is_active: user.isActive,
      companyId: user.companyId,
      role: user.role,
      company: {
        id: company.id,
        name: company.name
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}