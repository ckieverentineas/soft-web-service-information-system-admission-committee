import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Specialization } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Создание или обновление специализации
  const { _method, id, name, form_education, form_education_pay, education_complete_category, specialization_first } = req.body;
  //console.log('%cMyProject%cline:8%c_method, id, name, form_education, form_education_pay', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(254, 67, 101);padding:3px;border-radius:2px', _method, id, name, form_education, form_education_pay)
  if (req.method === 'GET') {
    // Получение списка специализаций
    const specializations = await prisma.specialization.findMany();
    return res.status(200).json(specializations);
  }
  if (req.method === 'POST') {
    if (_method === 'PUT' && id) {
      // Обновление специализации
      const updatedSpecialization = await prisma.specialization.update({
        where: { id: Number(id) },
        data: { name, form_education: form_education, form_education_pay: form_education_pay, education_complete_category: education_complete_category },
      });
      return res.status(200).json(updatedSpecialization);

    } 
    if (_method === 'DELETE' && id) {
      // Удаление специализации
      const { id } = req.body;
      await prisma.specialization.delete({ where: { id: Number(id) } });
      return res.status(200).json({ message: 'Specialization deleted' });
    }
    if (_method === 'POST') {
      // Создание специализации
      const newSpecialization = await prisma.specialization.create({
        data: { name, form_education: form_education, form_education_pay: form_education_pay, education_complete_category },
      });
      return res.status(200).json(newSpecialization);
    }
    if (_method === 'SELECTOR') {
      // Создание специализации
      const newSpecialization = await prisma.specialization.findFirst({
        where: { id: Number(id) },
      });
      return res.status(200).json(newSpecialization);
    }
    if (_method === 'COUNTER') {
      // Подсчет участников
      let counter = 0
      if (specialization_first) {
        const count = await prisma.passport.count({
          where: { specialization_first },
        });
        counter = count
      } else {
        const count = await prisma.passport.count();
        counter = count
      }
      return res.status(200).json({ message: counter });
    }
    if (_method === 'CLEARED') {
      // Выявление не задействованных юзеров
      const users = await prisma.passport.findMany();
      const specializations = await prisma.specialization.findMany();
      const allowedSpecializations = specializations.map(specialization => specialization.name);
      const usersWithSpecializations = users.filter(user => { return !allowedSpecializations.includes(user.specialization_first); })
      return res.status(200).json(usersWithSpecializations);
    }
    if (_method === 'INIT') {
      // Создание специализации
      const data_init = [
        {
          name: "Монтаж и эксплуатация оборудования и систем газоснабжения",
          form_education: "ЗАОЧНОЙ,ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ"
        },
        {
          name: "Монтаж, наладка и эксплуатация электрооборудования промышленных и гражданских зданий",
          form_education: "ЗАОЧНОЙ,ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ,СРЕДНЕЕ ОБЩЕЕ"
        },
        {
          name: "Компьютерные системы и комплексы",
          form_education: "ЗАОЧНОЙ,ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ"
        },
        {
          name: "Информационные системы и программирование",
          form_education: "ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ"
        },
        {
          name: "Почтовая связь",
          form_education: "ЗАОЧНОЙ,ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ,СРЕДНЕЕ ОБЩЕЕ"
        },
        {
          name: "Теплоснабжение и теплотехническое оборудование",
          form_education: "ЗАОЧНОЙ,ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ"
        },
        {
          name: "Технология аналитического контроля химических соединений",
          form_education: "ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ"
        },
        {
          name: "Оснащение средствами автоматизации технологических процессов и производств (по отраслям)",
          form_education: "ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ"
        },
        {
          name: "Экономика и бухгалтерский учет (по отраслям)",
          form_education: "ЗАОЧНОЙ,ОЧНОЙ",
          form_education_pay: "по договорам с оплатой стоимости обучения",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ,СРЕДНЕЕ ОБЩЕЕ"
        },
        {
          name: "Право и организация социального обеспечения",
          form_education: "ОЧНОЙ",
          form_education_pay: "по договорам с оплатой стоимости обучения",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ,СРЕДНЕЕ ОБЩЕЕ"
        },
        {
          name: "Мастер контрольно-измерительных приборов и автоматики",
          form_education: "ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ"
        },
        {
          name: "Лаборант-эколог",
          form_education: "ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ"
        },
        {
          name: "Электромонтажник электрических сетей и электрооборудования",
          form_education: "ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ"
        },
        {
          name: "Электромонтажник слаботочных систем",
          form_education: "ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ"
        },
        {
          name: "Наладчик аппаратных и программных средств инфокоммуникационных систем",
          form_education: "ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ"
        },
        {
          name: "Электромонтер по техническому обслуживанию электростанций и сетей",
          form_education: "ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ"
        },
        {
          name: "Электромонтер по ремонту и обслуживанию электрооборудования (по отраслям)",
          form_education: "ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ"
        },
        {
          name: "Продавец, контролёр-кассир",
          form_education: "ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ"
        },
        {
          name: "Оператор нефтепереработки",
          form_education: "ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ"
        },
        {
          name: "Наладчик компьютерных сетей",
          form_education: "ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ"
        },
        {
          name: "Техническое обслуживание и ремонт систем и агрегатов автомобилей",
          form_education: "ОЧНОЙ",
          form_education_pay: "финансируемые из средств краевого бюджета",
          education_complete_category: "ОСНОВНОЕ ОБЩЕЕ,СРЕДНЕЕ ОБЩЕЕ"
        },
      ]
      let ct = 0
      for (const i in data_init) {
        const sel = data_init[i]
        const spec_check = await prisma.specialization.findFirst({
          where: { name: sel.name },
        });
        if (!spec_check) {
          const spec_save = await prisma.specialization.create({ data: { name: sel.name, form_education: sel.form_education, form_education_pay: sel.form_education_pay, education_complete_category: sel.education_complete_category } })
          if (spec_check) {
            console.log(`Add new specialization: ${spec_save.id}`)
            ct++
          }
        }
      }
      return res.status(200).json({ message: `Добавлено специальностей по умолчанию: ${ct}`});
    }
  }
  return res.status(405).json({ message: 'Method not allowed' });
}