import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        // Process a POST request
        const data = req.body
        console.log(`Входные данные: ${JSON.stringify(data)}`)
        const user_create_account = await prisma.passport.update({
            where: {
                id: data.id
            },
            data: data
        })
        if (user_create_account) {
            console.log("Юзер обновлен")
            res.status(200).json({status: true})
        }
    }
    prisma.$disconnect()
}