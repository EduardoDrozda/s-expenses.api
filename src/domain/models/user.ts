import { Roles } from "@domain/enums";
import { BaseModel } from "./base-model";

export type UserModel = {
  name: string;
  email: string;
  phone: string;
  password: string;
  company_id: string;
  is_active?: boolean;
  role: Roles;
} & BaseModel;

export type CreateUserInput = Omit<UserModel, 'id' | 'created_at' | 'updated_at'>;