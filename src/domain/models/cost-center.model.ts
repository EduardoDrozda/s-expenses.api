import { CostCenter, Prisma } from "@prisma/client";
import { AuditableModel } from "./base-model";

export type CostCenterModel = CostCenter;

export type CreateCostCenterInput = Prisma.CostCenterCreateInput;

export type UpdateCostCenterInput = Pick<CostCenterModel, 'id' | 'name' | 'companyId' | 'updatedById'>;

export type DeleteCostCenterInput = Pick<CostCenterModel, 'id' | 'companyId' | 'deletedById'>;