/*
  Warnings:

  - Made the column `company_id` on table `category_expenses` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "category_expenses" DROP CONSTRAINT "category_expenses_company_id_fkey";

-- AlterTable
ALTER TABLE "category_expenses" ALTER COLUMN "company_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "category_expenses" ADD CONSTRAINT "category_expenses_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
