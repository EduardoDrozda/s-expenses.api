import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table
      .uuid('id', { primaryKey: true, useBinaryUuid: true })
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('name').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('phone').notNullable();
    table.boolean('is_active').defaultTo(true);
    table.string('role').defaultTo('user');

    table.uuid("company_id").notNullable().references("id").inTable("companies").onDelete("CASCADE");

    table.uuid("created_by").nullable().references("id").inTable("users").onDelete("SET NULL")
    table.uuid("updated_by").nullable().references("id").inTable("users").onDelete("SET NULL");
    table.uuid("deleted_by").references("id").inTable("users").onDelete("SET NULL");
    
    table.timestamps(true, true, false);
    table.timestamp("deleted_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
