import { categoryExpensesSeed } from "./category-expense.seed";
import { companySeed } from "./company.seed";
import { userSeed } from "./user.seed";

; (async () => {
  await companySeed()
    .then(() => console.log("Company seed completed successfully."))
    .catch((error) => console.error("Error seeding company:", error));

  await userSeed()
    .then(() => console.log("User seed completed successfully."))
    .catch((error) => console.error("Error seeding user:", error));

  await categoryExpensesSeed()
    .then(() => console.log("Category expenses seed completed successfully."))
    .catch((error) => console.error("Error seeding category expenses:", error));
})().catch((error) => {
  console.error("An error occurred during seeding:", error);
  process.exit(1);
});


