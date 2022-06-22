import { PrismaClient } from '@prisma/client'
import { promises as fs } from 'fs';
import {Document, Drawing} from 'docx'
import createReport from 'docx-templates';
import { Children } from 'react';
import xlsx from 'xlsx';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        let { specialization_first } = req.body
        console.log(req.body)
        const data = await prisma.passport.findMany({
            where: {
                specialization_first
            }
        })
        console.log(data)
        res.status(200).json(data)
    }
    prisma.$disconnect()
}