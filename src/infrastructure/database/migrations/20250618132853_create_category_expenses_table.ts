import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("categories_expenses", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("name").notNullable();
    table.string("description");
    table.string("icon");
    table.string("color");
    
    table.uuid("company_id").notNullable().references("id").inTable("companies").onDelete("CASCADE");
    table.uuid("created_by").references("id").inTable("users").onDelete("SET NULL");
    table.uuid("updated_by").references("id").inTable("users").onDelete("SET NULL");

    table.timestamp("deleted_at").nullable();
    table.uuid("deleted_by").references("id").inTable("users").onDelete("SET NULL");

    table.timestamps(true, true, false);

    table.unique(["name", "company_id"], { indexName: "unique_category_company" });
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("categories_expenses");
}

