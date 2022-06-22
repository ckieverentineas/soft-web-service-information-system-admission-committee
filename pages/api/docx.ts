import { PrismaClient } from '@prisma/client'
import { promises as fs } from 'fs';
import {Document, Drawing} from 'docx'
import createReport from 'docx-templates';
import { Children } from 'react';
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const { id } = req.body
        console.log(req.body)
        const user = await prisma.passport.findFirst({
            where: {
                id
            }}
        )
        const template = await fs.readFile('./public/temple/test.docx');

        const buffer = await createReport({
        template,
        data: {
            citizenship: user?.citizenship.toUpperCase(), 
            passport: user?.passport.toUpperCase(),
            passport_seria: user?.passport_seria.toUpperCase(),
            passport_number: user?.passport_number.toUpperCase(),
            passport_place: user?.passport_place.toUpperCase(),
            passport_date: user?.passport_date.toUpperCase(),
            firstname: user?.firstname.toUpperCase(),
            name: user?.name.toUpperCase(),
            lastname: user?.lastname.toUpperCase(),
            birthday: user?.birthday.toUpperCase(),
            birthday_place: user?.birthday_place.toUpperCase(),
            phone: user?.phone.toUpperCase(),
            gender: user?.gender.toUpperCase(),
            adress_register: user?.adress_register.toUpperCase(),
            adress_fact: user?.adress_fact.toUpperCase(),
            email: user?.email.toUpperCase(),
            language: user?.language.toUpperCase(),
            specialization_first: user?.specialization_first.toUpperCase(),
            specialization_second: user?.specialization_second.toUpperCase(),
            form_education: user?.form_education.toUpperCase(),
            form_education_pay: user?.form_education_pay.toUpperCase(),
            education_complete_name: user?.education_complete_name.toUpperCase(),
            education_complete_year: user?.education_complete_year.toUpperCase(),
            education_complete_category: user?.education_complete_category.toUpperCase(),
            education_complete_document: user?.education_complete_document.toUpperCase(),
            education_complete_seria: user?.education_complete_seria.toUpperCase(),
            education_complete_number: user?.education_complete_number.toUpperCase(),
            education_complete_date: user?.education_complete_date.toUpperCase(),
            education_complete_type: user?.education_complete_type.toUpperCase(),
            medal: user?.medal.toUpperCase(),
            olympiad: user?.olympiad.toUpperCase(),
            work_stage_year: user?.work_stage_year.toUpperCase(),
            work_stage_month: user?.work_stage_month.toUpperCase(),
            work_place_post: user?.work_place_post.toUpperCase(),
            house: user?.house.toUpperCase(),
            snils: user?.snils.toUpperCase(),
            inn: user?.inn.toUpperCase(),
            education_spo: user?.education_spo.toUpperCase(),
            parent_mother_initial: user?.parent_mother_initial.toUpperCase(),
            parent_mother_work: user?.parent_mother_work.toUpperCase(),
            parent_mother_work_post: user?.parent_mother_work_post.toUpperCase(),
            parent_mother_phone: user?.parent_mother_phone.toUpperCase(),
            parent_father_initial: user?.parent_father_initial.toUpperCase(),
            parent_father_work: user?.parent_father_work.toUpperCase(),
            parent_father_work_post: user?.parent_father_work_post.toUpperCase(),
            parent_father_phone: user?.parent_father_phone.toUpperCase(),
            hobby: user?.hobby.toUpperCase(),
            army: user?.army.toUpperCase(),
            sport: user?.sport.toUpperCase(),
            sport_level: user?.sport_level.toUpperCase(),
            success: user?.success.toUpperCase()
        },
        cmdDelimiter: ['{', '}'],
        });
        await fs.writeFile(`./public/files/${id}_${user?.firstname}_${user?.name}_${user?.lastname}.docx`, buffer)
        await res.status(200).json({link: `./public/temple/${id}_${user?.firstname}_${user?.name}_${user?.lastname}.docx`})
    }
    prisma.$disconnect()
}