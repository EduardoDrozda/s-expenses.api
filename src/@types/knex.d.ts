import 'knex';

declare module 'knex/types/tables' {
  interface Tables {
   companies: {
      id: string; // UUID
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
  }
}
