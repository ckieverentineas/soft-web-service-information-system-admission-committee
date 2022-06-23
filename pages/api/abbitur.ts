import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        // Process a POST request
        const data = req.body
        const user_create_account = await prisma.passport.create({
            data: data
        })
        console.log(`Новый абиттуриент ${user_create_account.id} добавлен успешно`)
        if (user_create_account) {
            res.status(200).json({status: true})
        }
    }
    
    if (req.method === 'GET') {
        // Process a POST request
        //const { email, password } = req.body
        const user = await prisma.passport.findMany()
        res.status(200).json(user)
    }
    prisma.$disconnect()
}