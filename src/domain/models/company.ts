import { BaseModel } from "./base-model";

export type CompanyModel = {
  name: string;
  email: string;
  phone: string;
  address: string;
} & BaseModel

export type CreateCompanyInput = Omit<CompanyModel, 'id' | 'created_at' | 'updated_at'>;