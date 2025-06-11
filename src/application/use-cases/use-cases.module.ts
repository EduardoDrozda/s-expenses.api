import { JwtModule } from "@common/jwt";
import { LoggerModule } from "@common/logger";
import { HashModule } from "@common/hash";
import { Global, Module } from "@nestjs/common";
import { AUTH_USE_CASES } from "./auth";
import { USER_USE_CASES } from "./user";

@Global()
@Module({
  imports: [LoggerModule, HashModule, JwtModule],
  providers: [...AUTH_USE_CASES, ...USER_USE_CASES],
  exports: [...AUTH_USE_CASES, ...USER_USE_CASES]
})
export class UseCasesModule { }