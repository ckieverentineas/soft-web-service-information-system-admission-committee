/*
  Warnings:

  - Added the required column `education_complete_category` to the `Specialization` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Specialization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "form_education" TEXT NOT NULL,
    "form_education_pay" TEXT NOT NULL,
    "education_complete_category" TEXT NOT NULL
);
INSERT INTO "new_Specialization" ("form_education", "form_education_pay", "id", "name") SELECT "form_education", "form_education_pay", "id", "name" FROM "Specialization";
DROP TABLE "Specialization";
ALTER TABLE "new_Specialization" RENAME TO "Specialization";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
