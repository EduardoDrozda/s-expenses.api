import { RolesEnum } from "../../../domain/enums";
import { CreateUserInput } from "../../../domain/models";
import { HashService } from "../../../common/hash/hash.service";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const isProduction = process.env.NODE_ENV === "production";
  const hasData = await knex("users").select("id").first();

  if (isProduction || hasData) {
    console.log("Data already exists in the table, skipping seed.");
    return;
  }

  const company = await knex("companies").select("id").first();
  console.log("Company ID found:", company);

  if (!company) {
    console.error("No company found to associate with the user.");
    return;
  }

  const hashService = new HashService(Number(process.env.HASH_SALT_ROUNDS) || 10);

  const newUser: CreateUserInput = {
    name: "John Doe",
    email: "email@email.com",
    phone: "1234567890",
    password: await hashService.hash("password123"),
    company_id: company.id,
    role: RolesEnum.ADMIN
  }

  return await knex("users")
    .insert(newUser)
    .then(() => console.log("User data seeded successfully."))
    .catch((error) => console.error("Error seeding user data:", error));
};
