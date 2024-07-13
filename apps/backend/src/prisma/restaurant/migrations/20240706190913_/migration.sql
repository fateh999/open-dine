/*
  Warnings:

  - You are about to drop the column `inStock` on the `Food` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "FoodStatus" AS ENUM ('IN_STOCK', 'DRAFT', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "inStock",
ADD COLUMN     "status" "FoodStatus" NOT NULL DEFAULT 'DRAFT';
