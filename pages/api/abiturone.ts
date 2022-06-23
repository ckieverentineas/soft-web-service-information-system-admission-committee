import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        // Process a POST request
        const { id } = req.body
        const user = await prisma.passport.findFirst({
            where: {
                id
            }}
        )
        if (user) {
            console.log(`Открыта карточка абитуриента ${user.id}`)
        }
        res.status(200).json(user)
    }
    prisma.$disconnect()
}