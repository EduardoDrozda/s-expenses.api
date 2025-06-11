import { CompanyModel } from "@domain/models";

export const COMPANY_REPOSITORY = Symbol("ICompanyRepository");

export interface ICompanyRepository {
  findById(id: string): Promise<CompanyModel | undefined>;
}