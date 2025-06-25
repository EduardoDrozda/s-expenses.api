import { CostCenterModel, CreateCostCenterInput, DeleteCostCenterInput, UpdateCostCenterInput } from "@domain/models";

export const COST_CENTER_REPOSITORY = Symbol('ICostCenterRepository');

export interface ICostCenterRepository {
  create(data: CreateCostCenterInput): Promise<CostCenterModel>;
  findAllByCompanyId(companyId: string): Promise<CostCenterModel[]>;
  findById(id: string, companyId: string): Promise<CostCenterModel | null>;
  findByName(name: string, companyId: string): Promise<CostCenterModel | null>;
  update(data: UpdateCostCenterInput): Promise<CostCenterModel>;
  delete(data: DeleteCostCenterInput): Promise<void>;
}