import { Prisma, PrismaClient } from "@prisma/client";

export async function categoryExpensesSeed() {
  const prisma = new PrismaClient();

  const isProduction = process.env.NODE_ENV === "production";
  const hasData = await prisma.categoryExpense.findFirst();

  if (isProduction || hasData) {
    console.log("Data already exists in the table, skipping seed.");
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

  const categories: Prisma.CategoryExpenseCreateInput[] = [
    {
      name: "Alimentação",
      company: {
        connect: { id: companyId },
      },
      description: "Despesas relacionadas a alimentação",
      createdBy: {
        connect: { id: userId },
      },
      icon: "fa-solid fa-utensils",
      color: "#FF6347",
    },
    {
      name: "Transporte",
      company: {
        connect: { id: companyId },
      },
      description: "Despesas relacionadas a transporte",
      createdBy: {
        connect: { id: userId },
      },
      icon: "fa-solid fa-bus",
      color: "#4682B4",
    },
    {
      name: "Hospedagem",
      company: {
        connect: { id: companyId },
      },
      description: "Despesas relacionadas a hospedagem",
      createdBy: {
        connect: { id: userId },
      },
      icon: "fa-solid fa-bed",
      color: "#8B4513",
    },
    {
      name: "Serviços",
      company: {
        connect: { id: companyId },
      },
      description: "Despesas relacionadas a serviços prestados",
      createdBy: {
        connect: { id: userId },
      },
      icon: "fa-solid fa-tools",
      color: "#32CD32",
    },
    {
      name: "Outros",
      company: {
        connect: { id: companyId },
      },
      description: "Outras despesas diversas",
      createdBy: {
        connect: { id: userId },
      },
      icon: "fa-solid fa-ellipsis-h",
      color: "#808080",
    },
  ];

  const createPromises = categories.map((category) =>
    prisma.categoryExpense.create({
      data: category,
    })
  );

  try {
    await Promise.all(createPromises);
    console.log("Category expenses seeded successfully.");
  } catch (error) {
    console.error("Error seeding category expenses:", error);
  } finally {
    await prisma.$disconnect();
  }
}