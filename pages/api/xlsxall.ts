import { PrismaClient } from '@prisma/client'
import { promises as fs } from 'fs';
import {Document, Drawing} from 'docx'
import createReport from 'docx-templates';
import { Children } from 'react';
import xlsx from 'xlsx';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const spec = await prisma.specialization.findMany({})
        /*
        const spec = [
            'Компьютерные системы и комплексы',
            'Монтаж и эксплуатация оборудования и систем газоснабжения',
            'Монтаж, наладка и эксплуатация электрооборудования промышленных и гражданских зданий',
            'Информационные системы и программирование',
            'Почтовая связь',
            'Теплоснабжение и теплотехническое оборудование',
            'Технология аналитического контроля химических соединений',
            'Электромонтажник электрических сетей и электрооборудования',
            'Электромонтер по техническому обслуживанию электростанций и сетей',
            'Электромонтер по ремонту и обслуживанию электрооборудования (по отраслям)',
            'Оператор нефтепереработки',
            'Продавец, контролёр-кассир',
            'Мастер контрольно-измерительных приборов и автоматики',
            'Лаборант-эколог',
            'Наладчик компьютерных сетей',
            'Техническое обслуживание и ремонт систем и агрегатов автомобилей'
        ]
        
        const form = ['ЗАОЧНОЙ', 'ОЧНОЙ']
        const specmod = ['Экономика и бухгалтерский учет (по отраслям)',
                        'Право и организация социального обеспечения']
        const educ = ['СРЕДНЕЕ ОБЩЕЕ', 'ОСНОВНОЕ ОБЩЕЕ']
        */
        let WorkBook = xlsx.utils.book_new()
        for (let sp=0; sp < spec.length; sp++) {
            const form_educ = spec[sp].form_education.split(',')
            for (let fr=0; fr < form_educ.length; fr++) {
                const educ = spec[sp].education_complete_category.split(',')
                for (let ed=0; ed < educ.length; ed++) {
                    const data = await prisma.passport.findMany({
                        where: {
                            specialization_first: spec[sp].name,
                            form_education: form_educ[fr],
                            education_complete_category: educ[ed]
                        },
                        select: {
                            id: true,
                            firstname: true,
                            name: true,
                            lastname: true,
                            svo: true,
                            tree:true,
                            four: true,
                            five: true,
                            education_complete_type: true,
                            form_education: true,
                            house: true
                        }
                    })
                    if (data.length == 0) { continue }
                    let jsonArr = [];
                    let counter = 1
                    for (let i = 0; i < data.length; i++) {
                        jsonArr.push({
                            id: counter++,
                            fio: data[i].firstname + " " + data[i].name + " " + data[i].lastname,
                            aver: ((parseInt(data[i].tree)*3+parseInt(data[i].four)*4+parseInt(data[i].five)*5)/(parseInt(data[i].tree)+parseInt(data[i].four)+parseInt(data[i].five))).toFixed(2),
                            svo: data[i].svo,
                            doc: data[i].education_complete_type,
                            house: data[i].house
                        });
                    }//return a.сумма.slice(0, -1) - b.сумма.slice(0, -1);
                    //jsonArr.sort(function(a:any, b:any) {return b.aver.slice(0, -1) - a.aver.slice(0, -1)})
                    jsonArr.sort(function(a:any, b:any) {
                        return parseFloat(b.aver) - parseFloat(a.aver);
                    });
                    let complet = []
                    counter = 1
                    for (let i = 0; i < jsonArr.length; i++) {
                        complet.push({
                            id: counter++,
                            fio: jsonArr[i].fio,
                            aver: jsonArr[i].aver,
                            svo: jsonArr[i].svo,
                            doc: jsonArr[i].doc,
                            house: jsonArr[i].house
                        });
                    }
                    const WorkSheet = xlsx.utils.json_to_sheet(complet|| {id: null, fio: null, aver:null, doc: null})
                    //console.log(`${form_educ[fr].slice(0, 2)}_${educ[ed].slice(0, 2)}_${spec[sp].name}`.slice(0, 31))
                    xlsx.utils.book_append_sheet(WorkBook, WorkSheet, `${form_educ[fr].slice(0, 2)}_${educ[ed].slice(0, 2)}_${spec[sp].name}`.slice(0, 31));

                    /* fix headers */
                    xlsx.utils.sheet_add_aoa(WorkSheet, [["№ п/п", "ФИО абитуриента", "ср. балл", "СВО", "копия/оригинал", "В общежитии"]], { origin: "A1" });
                }
                
            }
        }
        /*
        for (let i=0; i < specmod.length; i++) {
            for (let j=0; j < form.length; j++) {
                for (let x=0; x < educ.length; x++) {
                    const data = await prisma.passport.findMany({
                        where: {
                            specialization_first: specmod[i],
                            form_education: form[j],
                            education_complete_category: educ[x]
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
                            form_education: true,
                            house: true
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
                            house: data[i].house
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
                            house: jsonArr[i].house
                        });
                    }
                    const WorkSheet = xlsx.utils.json_to_sheet(complet|| {id: null, fio: null, aver:null, doc: null})
                    xlsx.utils.book_append_sheet(WorkBook, WorkSheet, `${form[j]}_${educ[x]}_${specmod[i]}`.substr(0, 31));

                    
                    xlsx.utils.sheet_add_aoa(WorkSheet, [["№ п/п", "ФИО абитуриента", "ср. балл", "копия/оригинал", "В общежитии"]], { origin: "A1" });
                }
            }
        }
        */
        /* create an XLSX file and try to save to Presidents.xlsx */
        console.log(`Создание таблицы... ./public/tables/full.xlsx`)
        const sela = xlsx.writeFile(WorkBook, `./public/tables/full.xlsx`);
        await res.status(200).json({link: `./public/tables/full.xlsx`})
    }
    prisma.$disconnect()
}