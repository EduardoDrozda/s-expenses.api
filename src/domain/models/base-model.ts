export type BaseModel = {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type AuditableModel = BaseModel & {
  deletedAt?: string | null;
  deletedBy?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  companyId?: string | null;
}