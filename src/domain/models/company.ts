import { Company, Prisma } from "@prisma/client";
import { AuditableModel, BaseModel } from "./base-model";

export type CompanyModel = Company;

export type CreateCompanyInput = Prisma.CompanyCreateInput;

export type UpdateCompanyInput = Prisma.CompanyUpdateInput

export type DeleteCompanyInput = Pick<CompanyModel, 'id'> & Pick<AuditableModel, 'deletedBy'>;