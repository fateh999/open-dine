/*
  Warnings:

  - You are about to drop the column `order` on the `MenuCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[menuId,categoryId,menuOrder]` on the table `MenuCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `menuOrder` to the `MenuCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MenuCategory_menuId_categoryId_order_key";

-- AlterTable
ALTER TABLE "MenuCategory" DROP COLUMN "order",
ADD COLUMN     "menuOrder" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MenuCategory_menuId_categoryId_menuOrder_key" ON "MenuCategory"("menuId", "categoryId", "menuOrder");
