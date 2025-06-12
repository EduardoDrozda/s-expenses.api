import { IUserRepository } from "@application/repositories";
import { UserModel, CreateUserInput } from "@domain/models";
import { knex } from "@infrastructure/database";
import { Injectable } from "@nestjs/common";
import { Knex } from "knex";

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly database: Knex = knex;
  
  async findByEmail(email: string): Promise<UserModel | undefined> {
    return await this.database("users")
      .where({ email })
      .first();
  }
  
  async create(user: CreateUserInput): Promise<UserModel> {
    const [createdUser] = await this.database<UserModel>("users")
      .insert(user)
      .returning("*");
      
    return createdUser;
  }

  async findById(id: string): Promise<UserModel | undefined> {
    return await this.database("users")
      .where({ id })
      .first();
  }
}