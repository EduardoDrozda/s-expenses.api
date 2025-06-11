export type GetUserDTO = {
  id: string;
  name: string;
  email: string;
  phone: string;
  is_active?: boolean;
  company?: {
    id: string;
    name: string;
  }
  role: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}