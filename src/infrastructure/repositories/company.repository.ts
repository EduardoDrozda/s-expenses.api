import { ICompanyRepository } from "@application/repositories";
import { CompanyModel } from "@domain/models";
import { knex } from "@infrastructure/database";
import { Injectable } from "@nestjs/common";
import { Knex } from "knex";

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  private readonly database: Knex = knex;

  async findById(id: string): Promise<CompanyModel | undefined> {
    return await this.database("companies")
      .where({ id })
      .first();
  }
}