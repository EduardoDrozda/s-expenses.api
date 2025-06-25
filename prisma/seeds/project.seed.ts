import { Prisma, PrismaClient } from "@prisma/client";

export async function projectsSeed() {
  const prisma = new PrismaClient();

  const hasData = await prisma.project.findFirst();

  if (hasData) {
    console.log("Project already exists in the table, skipping seed.");
    return;
  }

  const company = await prisma.company.findFirst();

  if (!company) {
    console.error("No company found to associate with the project.");
    return;
  }

  const user = await prisma.user.findFirst({
    where: { email: "email@email.com" },
  });

  if (!user) {
    console.error("No user found to associate with the project.");
    return;
  }

  const { id: userId, companyId } = user;

  const projects: Prisma.ProjectCreateManyInput[] = [
    {
      name: "Project 1",
      description: "Project 1 description",
      companyId,
      createdById: userId,
    },
    {
      name: "Project 2",
      description: "Project 2 description",
      companyId,
      createdById: userId,
    },
    {
      name: "Project 3",
      description: "Project 3 description",
      companyId,
      createdById: userId,
    },
    {
      name: "Project 4",
      description: "Project 4 description",
      companyId,
      createdById: userId,
    },
    {
      name: "Project 5",
      description: "Project 5 description",
      companyId,
      createdById: userId,
    },
    {
      name: "Project 6",
      description: "Project 6 description",
      companyId,
      createdById: userId,
    },
  ];

  await prisma.project.createMany({ data: projects, skipDuplicates: true });

  console.log("Projects created successfully");
}