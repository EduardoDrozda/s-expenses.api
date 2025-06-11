import { CreateUserInput, UserModel } from "@domain/models";

export const USER_REPOSITORY = Symbol("IUserRepository");

export interface IUserRepository {
  findByEmail(email: string): Promise<UserModel | undefined>;
  createUser(user: CreateUserInput): Promise<UserModel>;
  findById(id: string): Promise<UserModel | undefined>;
}