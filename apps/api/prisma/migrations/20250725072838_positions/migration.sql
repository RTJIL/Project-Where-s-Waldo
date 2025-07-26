/*
  Warnings:

  - You are about to drop the column `positionId` on the `Character` table. All the data in the column will be lost.
  - Added the required column `characterId` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_positionId_fkey";

-- DropIndex
DROP INDEX "Character_positionId_key";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "positionId";

-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "characterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
