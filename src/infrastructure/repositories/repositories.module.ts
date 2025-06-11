import { COMPANY_REPOSITORY, USER_REPOSITORY } from '@application/repositories';
import { Global, Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CompanyRepository } from './company.repository';

@Global()
@Module({
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository
    },
    {
      provide: COMPANY_REPOSITORY,
      useClass: CompanyRepository
    }
  ],
  exports: [USER_REPOSITORY, COMPANY_REPOSITORY]
})
export class RepositoriesModule {}
