import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Specialization } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Создание или обновление специализации
  const { _method, id, name, form_education, form_education_pay, education_complete_category } = req.body;
  console.log('%cMyProject%cline:8%c_method, id, name, form_education, form_education_pay', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(254, 67, 101);padding:3px;border-radius:2px', _method, id, name, form_education, form_education_pay)
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
  }
  return res.status(405).json({ message: 'Method not allowed' });
}