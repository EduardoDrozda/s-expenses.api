import { Prisma, PrismaClient } from "@prisma/client";

export async function groupsSeed() {
  const prisma = new PrismaClient();

  const hasData = await prisma.group.findFirst();

  if (hasData) {
    console.log("Group already exists in the table, skipping seed.");
    return;
  }

  const company = await prisma.company.findFirst();

  if (!company) {
    console.error("No company found to associate with the group.");
    return;
  }

  const user = await prisma.user.findFirst({
    where: { email: "email@email.com" },
  });

  if (!user) {
    console.error("No user found to associate with the categories.");
    return;
  }

  const { id: userId, companyId } = user;

  const groups: Prisma.GroupCreateManyInput[] = [
    {
      name: "Group 1",
      description: "Group 1 description",
      companyId,
      createdById: userId,
    },
    {
      name: "Group 2",
      description: "Group 2 description",
      companyId,
      createdById: userId,
    },
    {
      name: "Group 3",
      description: "Group 3 description",
      companyId,
      createdById: userId,
    },
    {
      name: "Group 4",
      description: "Group 4 description",
      companyId,
      createdById: userId,
    },
    {
      name: "Group 5",
      description: "Group 5 description",
      companyId,
      createdById: userId,
    },
    {
      name: "Group 6",
      description: "Group 6 description",
      companyId,
      createdById: userId,
    },
    {
      name: "Group 7",
      description: "Group 7 description",
      companyId,
      createdById: userId,
    },
  ];

  await prisma.group.createMany({ data: groups, skipDuplicates: true });

  console.log("Groups created successfully");
}