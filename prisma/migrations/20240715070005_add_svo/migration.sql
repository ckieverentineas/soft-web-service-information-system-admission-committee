-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Passport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "citizenship" TEXT NOT NULL,
    "passport" TEXT NOT NULL,
    "passport_seria" TEXT NOT NULL,
    "passport_number" TEXT NOT NULL,
    "passport_place" TEXT NOT NULL,
    "passport_date" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "birthday_place" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "svo" TEXT NOT NULL DEFAULT 'НЕТ',
    "adress_register" TEXT NOT NULL,
    "adress_fact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "specialization_first" TEXT NOT NULL,
    "specialization_second" TEXT NOT NULL,
    "form_education" TEXT NOT NULL,
    "form_education_pay" TEXT NOT NULL,
    "education_complete_name" TEXT NOT NULL,
    "education_complete_year" TEXT NOT NULL,
    "education_complete_category" TEXT NOT NULL,
    "education_complete_document" TEXT NOT NULL,
    "education_complete_seria" TEXT NOT NULL,
    "education_complete_number" TEXT NOT NULL,
    "education_complete_date" TEXT NOT NULL,
    "education_complete_type" TEXT NOT NULL,
    "medal" TEXT NOT NULL,
    "olympiad" TEXT NOT NULL,
    "work_stage_year" TEXT NOT NULL,
    "work_stage_month" TEXT NOT NULL,
    "work_place_post" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "snils" TEXT NOT NULL,
    "inn" TEXT NOT NULL,
    "education_spo" TEXT NOT NULL,
    "parent_mother_initial" TEXT NOT NULL,
    "parent_mother_work" TEXT NOT NULL,
    "parent_mother_work_post" TEXT NOT NULL,
    "parent_mother_phone" TEXT NOT NULL,
    "parent_father_initial" TEXT NOT NULL,
    "parent_father_work" TEXT NOT NULL,
    "parent_father_work_post" TEXT NOT NULL,
    "parent_father_phone" TEXT NOT NULL,
    "hobby" TEXT NOT NULL,
    "army" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "sport_level" TEXT NOT NULL,
    "success" TEXT NOT NULL,
    "tree" TEXT NOT NULL DEFAULT '',
    "four" TEXT NOT NULL DEFAULT '',
    "five" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Passport" ("adress_fact", "adress_register", "army", "birthday", "birthday_place", "citizenship", "education_complete_category", "education_complete_date", "education_complete_document", "education_complete_name", "education_complete_number", "education_complete_seria", "education_complete_type", "education_complete_year", "education_spo", "email", "firstname", "five", "form_education", "form_education_pay", "four", "gender", "hobby", "house", "id", "inn", "language", "lastname", "medal", "name", "olympiad", "parent_father_initial", "parent_father_phone", "parent_father_work", "parent_father_work_post", "parent_mother_initial", "parent_mother_phone", "parent_mother_work", "parent_mother_work_post", "passport", "passport_date", "passport_number", "passport_place", "passport_seria", "phone", "snils", "specialization_first", "specialization_second", "sport", "sport_level", "success", "tree", "work_place_post", "work_stage_month", "work_stage_year") SELECT "adress_fact", "adress_register", "army", "birthday", "birthday_place", "citizenship", "education_complete_category", "education_complete_date", "education_complete_document", "education_complete_name", "education_complete_number", "education_complete_seria", "education_complete_type", "education_complete_year", "education_spo", "email", "firstname", "five", "form_education", "form_education_pay", "four", "gender", "hobby", "house", "id", "inn", "language", "lastname", "medal", "name", "olympiad", "parent_father_initial", "parent_father_phone", "parent_father_work", "parent_father_work_post", "parent_mother_initial", "parent_mother_phone", "parent_mother_work", "parent_mother_work_post", "passport", "passport_date", "passport_number", "passport_place", "passport_seria", "phone", "snils", "specialization_first", "specialization_second", "sport", "sport_level", "success", "tree", "work_place_post", "work_stage_month", "work_stage_year" FROM "Passport";
DROP TABLE "Passport";
ALTER TABLE "new_Passport" RENAME TO "Passport";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
