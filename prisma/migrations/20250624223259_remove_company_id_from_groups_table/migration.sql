/*
  Warnings:

  - You are about to drop the column `company_id` on the `cost_center_groups` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cost_center_groups" DROP CONSTRAINT "cost_center_groups_company_id_fkey";

-- AlterTable
ALTER TABLE "cost_center_groups" DROP COLUMN "company_id";
