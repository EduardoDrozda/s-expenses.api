import { Company } from "@prisma/client";

export const COMPANY_REPOSITORY = Symbol("ICompanyRepository");

export interface ICompanyRepository {
  findById(id: string): Promise<Company | null>;
}