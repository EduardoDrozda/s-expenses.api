import { JwtModule } from "@common/jwt";
import { LoggerModule } from "@common/logger";
import { HashModule } from "@common/hash";
import { Global, Module } from "@nestjs/common";
import { AUTH_USE_CASES } from "./auth";
import { USER_USE_CASES } from "./user";
import { EXPENSE_CATEGORY_USE_CASES } from "./expense-category";
import { EXPENSES_USE_CASES } from "./expense";
import { COST_CENTER_USE_CASES } from "./cost-center";
import { GROUP_USE_CASES } from "./group";
import { PROJECT_USE_CASES } from "./projects";

@Global()
@Module({
  imports: [LoggerModule, HashModule, JwtModule],
  providers: [
    ...AUTH_USE_CASES,
    ...USER_USE_CASES,
    ...EXPENSE_CATEGORY_USE_CASES,
    ...EXPENSES_USE_CASES,
    ...COST_CENTER_USE_CASES,
    ...GROUP_USE_CASES,
    ...PROJECT_USE_CASES
  ],
  exports: [
    ...AUTH_USE_CASES,
    ...USER_USE_CASES,
    ...EXPENSE_CATEGORY_USE_CASES,
    ...EXPENSES_USE_CASES,
    ...COST_CENTER_USE_CASES,
    ...GROUP_USE_CASES,
    ...PROJECT_USE_CASES
  ]
})
export class UseCasesModule { }