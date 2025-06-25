import { CATEGORY_EXPENSE_REPOSITORY, COMPANY_REPOSITORY, COST_CENTER_REPOSITORY, GROUP_REPOSITORY, USER_REPOSITORY } from '@domain/repositories';
import { Global, Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CompanyRepository } from './company.repository';
import { CategoryExpenseRepository } from './category-expense.repository';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { CostCenterRepository } from './cost-center.repository';
import { GroupRepository } from './group.repository';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository
    },
    {
      provide: COMPANY_REPOSITORY,
      useClass: CompanyRepository
    },
    {
      provide: CATEGORY_EXPENSE_REPOSITORY,
      useClass: CategoryExpenseRepository
    },
    {
      provide: COST_CENTER_REPOSITORY,
      useClass: CostCenterRepository
    },
    {
      provide: GROUP_REPOSITORY,
      useClass: GroupRepository
    }
  ],
  exports: [
    USER_REPOSITORY,
    COMPANY_REPOSITORY,
    CATEGORY_EXPENSE_REPOSITORY,
    COST_CENTER_REPOSITORY,
    GROUP_REPOSITORY
  ]
})
export class RepositoriesModule { }
