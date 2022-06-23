import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        // Process a POST request
        const data = req.body
        const user_create_account = await prisma.passport.update({
            where: {
                id: data.id
            },
            data: data
        })
        if (user_create_account) {
            console.log(`Данные абитуриента ${user_create_account.id} успешно обновлены`)
            res.status(200).json({status: true})
        }
    }
    prisma.$disconnect()
}