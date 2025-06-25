import { categoryExpensesSeed } from "./category-expense.seed";
import { companySeed } from "./company.seed";
import { costCenterSeed } from "./cost-center.seed";
import { groupsSeed } from "./group.seed";
import { projectsSeed } from "./project.seed";
import { userSeed } from "./user.seed";

; (async () => {
  await companySeed()
    .catch((error) => console.error("Error seeding company:", error));

  await userSeed()
    .catch((error) => console.error("Error seeding user:", error));

  await categoryExpensesSeed()
    .catch((error) => console.error("Error seeding category expenses:", error));

  await costCenterSeed()
    .catch((error) => console.error("Error seeding cost center:", error));

  await groupsSeed()
    .catch((error) => console.error("Error seeding group:", error));

  await projectsSeed()
    .catch((error) => console.error("Error seeding project:", error));

})().catch((error) => {
  console.error("An error occurred during seeding:", error);
  process.exit(1);
});


