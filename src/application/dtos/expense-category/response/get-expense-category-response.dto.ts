export type GetExpenseCategoryResponseDto = {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  company_id?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  deleted_by?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
}