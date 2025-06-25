import { CreateCostCenterUseCase } from './create-cost-center.use-case';
import { GetAllCostCenterUseCase } from './get-all-cost-center.use-case';

export * from './create-cost-center.use-case';

export const COST_CENTER_USE_CASES = [
  CreateCostCenterUseCase,
  GetAllCostCenterUseCase
]