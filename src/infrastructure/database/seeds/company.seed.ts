import { CreateCompanyInput } from "../../../domain/models";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const isProduction = process.env.NODE_ENV === "production";

  const hasData = await knex("companies").select("id").first();

  if (isProduction || hasData) {
    console.log("Data already exists in the table, skipping seed.");
    return;
  }

  const newCompany: CreateCompanyInput = {
    name: "Example Company",
    email: "company@email.com",
    phone: "123-456-7890",
    address: "123 Example St, Example City, EX 12345"
  };

  return await knex("companies").insert(newCompany).then(() => console.log("Company data seeded successfully."));
};
