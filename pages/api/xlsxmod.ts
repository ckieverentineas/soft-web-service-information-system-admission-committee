import { PrismaClient } from '@prisma/client'
import { promises as fs } from 'fs';
import {Document, Drawing} from 'docx'
import createReport from 'docx-templates';
import { Children } from 'react';
import xlsx from 'xlsx';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        let { specialization_first, form_education, education_complete_category } = req.body
        console.log(req.body)
        const data = await prisma.passport.findMany({
            where: {
                specialization_first,
                form_education,
                education_complete_category
            },
            select: {
                id: true,
                firstname: true,
                name: true,
                lastname: true,
                tree:true,
                four: true,
                five: true,
                education_complete_type: true,
                form_education: true
            }
        }
        
        )
        let jsonArr = [];
        let counter = 1
        for (let i = 0; i < data.length; i++) {
            jsonArr.push({
                id: counter++,
                fio: data[i].firstname + " " + data[i].name + " " + data[i].lastname,
                aver: ((parseInt(data[i].tree)*3+parseInt(data[i].four)*4+parseInt(data[i].five)*5)/(parseInt(data[i].tree)+parseInt(data[i].four)+parseInt(data[i].five))).toFixed(2),
                doc: data[i].education_complete_type,
            });
        }//return a.сумма.slice(0, -1) - b.сумма.slice(0, -1);
        jsonArr.sort(function(a:any, b:any) {return b.aver.slice(0, -1) - a.aver.slice(0, -1)})
        let complet = []
        counter = 1
        for (let i = 0; i < jsonArr.length; i++) {
            complet.push({
                id: counter++,
                fio: jsonArr[i].fio,
                aver: jsonArr[i].aver,
                doc: jsonArr[i].doc,
            });
        }
        const WorkSheet = xlsx.utils.json_to_sheet(complet)
        const WorkBook = xlsx.utils.book_new()
        xlsx.utils.book_append_sheet(WorkBook, WorkSheet, "Dates");

        /* fix headers */
        xlsx.utils.sheet_add_aoa(WorkSheet, [["№ п/п", "ФИО абитуриента", "ср. балл", "копия/оригинал"]], { origin: "A1" });

        /* create an XLSX file and try to save to Presidents.xlsx */
        const sela = xlsx.writeFile(WorkBook, `./public/tables/${specialization_first}_${form_education}_${education_complete_category}.xlsx`);
        await res.status(200).json({link: `./public/tables/${specialization_first}_${form_education}_${education_complete_category}.xlsx`})
    }
    prisma.$disconnect()
}