import { CreateUserUseCase } from './create-user.use-case';
import { GetUserByIdUseCase } from './get-user-by-id.use-case';

export * from './get-user-by-id.use-case';
export * from './create-user.use-case';

export const USER_USE_CASES = [
  GetUserByIdUseCase,
  CreateUserUseCase
]