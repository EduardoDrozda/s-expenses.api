import 'knex';

declare module 'knex/types/tables' {
  interface Tables {
   companies: {
      id: string;
      name: string;
      email: string;
      phone: string;
      address: string;
      created_at: string;
      updated_at: string;
    };
    users: {
      id: string;
      company_id: string;
      name: string;
      password: string;
      email: string;
      phone: string;
      is_active: boolean;
      role: string;
      created_at: string;
      updated_at: string;
    };
    categories_expenses: {
      id: string;
      name: string;
      description?: string;
      icon?: string;
      color?: string;
      company_id: string;
      created_at: string;
      updated_at: string;
      deleted_at?: string;
      created_by: string;
      updated_by?: string;
      deleted_by?: string;
    };
  }
}
