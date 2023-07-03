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
                    })
                    if (data.length == 0) { continue }
                    let jsonArr = [];
                    let counter = 1
                    for (let i = 0; i < data.length; i++) {
                        jsonArr.push({
                            id: counter++,
                            fio: data[i].firstname + " " + data[i].name + " " + data[i].lastname,
                            aver: ((parseInt(data[i].tree)*3+parseInt(data[i].four)*4+parseInt(data[i].five)*5)/(parseInt(data[i].tree)+parseInt(data[i].four)+parseInt(data[i].five))).toFixed(2),
                            doc: data[i].education_complete_type,
                            house: data[i].house,
                            citizenship: data[i].citizenship,
                            passport: data[i].passport,
                            passport_seria: data[i].passport_seria,
                            passport_number: data[i].passport_number,
                            passport_place: data[i].passport_place,
                            passport_date: data[i].passport_date,
                            birthday: data[i].birthday,
                            birthday_place: data[i].birthday_place,
                            phone: data[i].phone,
                            gender: data[i].gender,
                            adress_register: data[i].adress_register,
                            adress_fact: data[i].adress_fact,
                            email: data[i].email,
                            language: data[i].language,
                            specialization_second: data[i].specialization_second,
                            form_education_pay: data[i].form_education_pay,
                            education_complete_name: data[i].education_complete_name,
                            education_complete_year: data[i].education_complete_year,
                            education_complete_category: data[i].education_complete_category,
                            education_complete_document: data[i].education_complete_document,
                            education_complete_seria: data[i].education_complete_seria,
                            education_complete_number: data[i].education_complete_number,
                            education_complete_date: data[i].education_complete_date,
                            medal: data[i].medal,
                            olympiad: data[i].olympiad,
                            work_stage_year: data[i].work_stage_year,
                            work_stage_month: data[i].work_stage_month,
                            work_place_post: data[i].work_place_post,
                            snils: data[i].snils,
                            inn: data[i].inn,
                            education_spo: data[i].education_spo,
                            parent_mother_initial: data[i].parent_mother_initial,
                            parent_mother_work: data[i].parent_mother_work,
                            parent_mother_work_post: data[i].parent_mother_work_post,
                            parent_mother_phone: data[i].parent_mother_phone,
                            parent_father_initial: data[i].parent_father_initial,
                            parent_father_work: data[i].parent_father_work,
                            parent_father_work_post: data[i].parent_father_work_post,
                            parent_father_phone: data[i].parent_father_phone,
                            hobby: data[i].hobby,
                            army: data[i].army,
                            sport: data[i].sport,
                            sport_level: data[i].sport_level,
                            success: data[i].success
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
                            doc: jsonArr[i].doc,
                            house: jsonArr[i].house,
                            citizenship: jsonArr[i].citizenship,
                            passport: jsonArr[i].passport,
                            passport_seria: jsonArr[i].passport_seria,
                            passport_number: jsonArr[i].passport_number,
                            passport_place: jsonArr[i].passport_place,
                            passport_date: jsonArr[i].passport_date,
                            birthday: jsonArr[i].birthday,
                            birthday_place: jsonArr[i].birthday_place,
                            phone: jsonArr[i].phone,
                            gender: jsonArr[i].gender,
                            adress_register: jsonArr[i].adress_register,
                            adress_fact: jsonArr[i].adress_fact,
                            email: jsonArr[i].email,
                            language: jsonArr[i].language,
                            specialization_second: jsonArr[i].specialization_second,
                            form_education_pay: jsonArr[i].form_education_pay,
                            education_complete_name: jsonArr[i].education_complete_name,
                            education_complete_year: jsonArr[i].education_complete_year,
                            education_complete_category: jsonArr[i].education_complete_category,
                            education_complete_document: jsonArr[i].education_complete_document,
                            education_complete_seria: jsonArr[i].education_complete_seria,
                            education_complete_number: jsonArr[i].education_complete_number,
                            education_complete_date: jsonArr[i].education_complete_date,
                            medal: jsonArr[i].medal,
                            olympiad: jsonArr[i].olympiad,
                            work_stage_year: jsonArr[i].work_stage_year,
                            work_stage_month: jsonArr[i].work_stage_month,
                            work_place_post: jsonArr[i].work_place_post,
                            snils: jsonArr[i].snils,
                            inn: jsonArr[i].inn,
                            education_spo: jsonArr[i].education_spo,
                            parent_mother_initial: jsonArr[i].parent_mother_initial,
                            parent_mother_work: jsonArr[i].parent_mother_work,
                            parent_mother_work_post: jsonArr[i].parent_mother_work_post,
                            parent_mother_phone: jsonArr[i].parent_mother_phone,
                            parent_father_initial: jsonArr[i].parent_father_initial,
                            parent_father_work: jsonArr[i].parent_father_work,
                            parent_father_work_post: jsonArr[i].parent_father_work_post,
                            parent_father_phone: jsonArr[i].parent_father_phone,
                            hobby: jsonArr[i].hobby,
                            army: jsonArr[i].army,
                            sport: jsonArr[i].sport,
                            sport_level: jsonArr[i].sport_level,
                            success: jsonArr[i].success,
                        });
                    }
                    const WorkSheet = xlsx.utils.json_to_sheet(complet|| {id: null, fio: null, aver:null, doc: null})
                    xlsx.utils.book_append_sheet(WorkBook, WorkSheet, `${form_educ[fr].slice(0, 2)}_${educ[ed].slice(0, 2)}_${spec[sp].name}`.substr(0, 31));

                    /* fix headers */
                    xlsx.utils.sheet_add_aoa(WorkSheet, [["№ п/п", "ФИО абитуриента", "ср. балл", "копия/оригинал", "В общежитии", 'Гражданство', 'Документ, удостоверяющий личность', 'Серия паспорта', 'Номер паспорта:', 'Кем выдан паспорта:', 'Дата выдачи паспорта:', 'Дата рождения:', 'Место Рождения:', 'Номер телефона:', 'Пол:', 'Адрес регистрации места жительства:', 'Фактический адрес места жительства:', 'e-mail:', 'Изучаемый иностранный язык:', 'Резервная специальность:', 'Место:', 'Образовательное учреждение:', 'Год окончания:', 'Полученное образование:', 'Документ, подтверждающий полученное образование:', 'Серия документа об образовании:', 'Номер документа об образовании:', 'Дата выдачи документа об образовании:', 'Медаль:', 'Победы в олимпиадах:', 'Трудовой стаж, лет:', 'Трудовой стаж, месяцев:', 'Место работы, занимаемая должность для заочников:', 'СНИЛС:', 'Мед полис:', 'Среднее профессиональное образование (СПО) получаю:', 'ФИО матери:', 'Работа матери:', 'Должность матери:', 'Телефон матери:', 'ФИО отца:', 'Работа отца:', 'Должность отца:', 'Телефон отца:', 'Интересы, увлечения, хобби:', 'Приписка к следующему военкомату:', 'Вид спорта:', 'Спортивный разряд:', 'Согласие на обработку персональных данных:']], { origin: "A1" });
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
                            house: data[i].house,
                            citizenship: data[i].citizenship,
                            passport: data[i].passport,
                            passport_seria: data[i].passport_seria,
                            passport_number: data[i].passport_number,
                            passport_place: data[i].passport_place,
                            passport_date: data[i].passport_date,
                            birthday: data[i].birthday,
                            birthday_place: data[i].birthday_place,
                            phone: data[i].phone,
                            gender: data[i].gender,
                            adress_register: data[i].adress_register,
                            adress_fact: data[i].adress_fact,
                            email: data[i].email,
                            language: data[i].language,
                            specialization_second: data[i].specialization_second,
                            form_education_pay: data[i].form_education_pay,
                            education_complete_name: data[i].education_complete_name,
                            education_complete_year: data[i].education_complete_year,
                            education_complete_category: data[i].education_complete_category,
                            education_complete_document: data[i].education_complete_document,
                            education_complete_seria: data[i].education_complete_seria,
                            education_complete_number: data[i].education_complete_number,
                            education_complete_date: data[i].education_complete_date,
                            medal: data[i].medal,
                            olympiad: data[i].olympiad,
                            work_stage_year: data[i].work_stage_year,
                            work_stage_month: data[i].work_stage_month,
                            work_place_post: data[i].work_place_post,
                            snils: data[i].snils,
                            inn: data[i].inn,
                            education_spo: data[i].education_spo,
                            parent_mother_initial: data[i].parent_mother_initial,
                            parent_mother_work: data[i].parent_mother_work,
                            parent_mother_work_post: data[i].parent_mother_work_post,
                            parent_mother_phone: data[i].parent_mother_phone,
                            parent_father_initial: data[i].parent_father_initial,
                            parent_father_work: data[i].parent_father_work,
                            parent_father_work_post: data[i].parent_father_work_post,
                            parent_father_phone: data[i].parent_father_phone,
                            hobby: data[i].hobby,
                            army: data[i].army,
                            sport: data[i].sport,
                            sport_level: data[i].sport_level,
                            success: data[i].success
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
                            house: jsonArr[i].house,
                            citizenship: jsonArr[i].citizenship,
                            passport: jsonArr[i].passport,
                            passport_seria: jsonArr[i].passport_seria,
                            passport_number: jsonArr[i].passport_number,
                            passport_place: jsonArr[i].passport_place,
                            passport_date: jsonArr[i].passport_date,
                            birthday: jsonArr[i].birthday,
                            birthday_place: jsonArr[i].birthday_place,
                            phone: jsonArr[i].phone,
                            gender: jsonArr[i].gender,
                            adress_register: jsonArr[i].adress_register,
                            adress_fact: jsonArr[i].adress_fact,
                            email: jsonArr[i].email,
                            language: jsonArr[i].language,
                            specialization_second: jsonArr[i].specialization_second,
                            form_education_pay: jsonArr[i].form_education_pay,
                            education_complete_name: jsonArr[i].education_complete_name,
                            education_complete_year: jsonArr[i].education_complete_year,
                            education_complete_category: jsonArr[i].education_complete_category,
                            education_complete_document: jsonArr[i].education_complete_document,
                            education_complete_seria: jsonArr[i].education_complete_seria,
                            education_complete_number: jsonArr[i].education_complete_number,
                            education_complete_date: jsonArr[i].education_complete_date,
                            medal: jsonArr[i].medal,
                            olympiad: jsonArr[i].olympiad,
                            work_stage_year: jsonArr[i].work_stage_year,
                            work_stage_month: jsonArr[i].work_stage_month,
                            work_place_post: jsonArr[i].work_place_post,
                            snils: jsonArr[i].snils,
                            inn: jsonArr[i].inn,
                            education_spo: jsonArr[i].education_spo,
                            parent_mother_initial: jsonArr[i].parent_mother_initial,
                            parent_mother_work: jsonArr[i].parent_mother_work,
                            parent_mother_work_post: jsonArr[i].parent_mother_work_post,
                            parent_mother_phone: jsonArr[i].parent_mother_phone,
                            parent_father_initial: jsonArr[i].parent_father_initial,
                            parent_father_work: jsonArr[i].parent_father_work,
                            parent_father_work_post: jsonArr[i].parent_father_work_post,
                            parent_father_phone: jsonArr[i].parent_father_phone,
                            hobby: jsonArr[i].hobby,
                            army: jsonArr[i].army,
                            sport: jsonArr[i].sport,
                            sport_level: jsonArr[i].sport_level,
                            success: jsonArr[i].success,
                        });
                    }
                    const WorkSheet = xlsx.utils.json_to_sheet(complet|| {id: null, fio: null, aver:null, doc: null})
                    xlsx.utils.book_append_sheet(WorkBook, WorkSheet, `${form[j]}_${educ[x]}_${specmod[i]}`.substr(0, 31));

                    
                    xlsx.utils.sheet_add_aoa(WorkSheet, [["№ п/п", "ФИО абитуриента", "ср. балл", "копия/оригинал", "В общежитии", 'Гражданство', 'Документ, удостоверяющий личность', 'Серия паспорта', 'Номер паспорта:', 'Кем выдан паспорта:', 'Дата выдачи паспорта:', 'Дата рождения:', 'Место Рождения:', 'Номер телефона:', 'Пол:', 'Адрес регистрации места жительства:', 'Фактический адрес места жительства:', 'e-mail:', 'Изучаемый иностранный язык:', 'Резервная специальность:', 'Место:', 'Образовательное учреждение:', 'Год окончания:', 'Полученное образование:', 'Документ, подтверждающий полученное образование:', 'Серия документа об образовании:', 'Номер документа об образовании:', 'Дата выдачи документа об образовании:', 'Медаль:', 'Победы в олимпиадах:', 'Трудовой стаж, лет:', 'Трудовой стаж, месяцев:', 'Место работы, занимаемая должность для заочников:', 'СНИЛС:', 'Мед полис:', 'Среднее профессиональное образование (СПО) получаю:', 'ФИО матери:', 'Работа матери:', 'Должность матери:', 'Телефон матери:', 'ФИО отца:', 'Работа отца:', 'Должность отца:', 'Телефон отца:', 'Интересы, увлечения, хобби:', 'Приписка к следующему военкомату:', 'Вид спорта:', 'Спортивный разряд:', 'Согласие на обработку персональных данных:']], { origin: "A1" });
                }
            }
        }*/
        /* create an XLSX file and try to save to Presidents.xlsx */
        console.log(`Создание таблицы... ./public/tables/fullfin.xlsx`)
        const sela = xlsx.writeFile(WorkBook, `./public/tables/fullfin.xlsx`);
        await res.status(200).json({link: `./public/tables/fullfin.xlsx`})
    }
    prisma.$disconnect()
}