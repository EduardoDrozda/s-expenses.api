export type BaseModel = {
  id: string;
  created_at: string;
  updated_at: string;
}

export type AuditableModel = BaseModel & {
  deleted_at?: string | null;
  deleted_by?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  company_id?: string | null;
}