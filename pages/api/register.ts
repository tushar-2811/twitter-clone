import {NextApiRequest , NextApiResponse} from 'next'
import bcrypt from 'bcrypt'
import prisma from '@/libs/Prismadb'

export default async function handler(
    req: NextApiRequest , 
    res: NextApiResponse
) {
    if(req.method !== "POST") {
        return res.status(405).end();
    }

    try {

        const {name , email , username , password} = req.body;
        const hashedPassword = await bcrypt.hash(password , 12);

        const user = await prisma?.user.create({
            data : {
                email , username ,  name , hashedPassword
            }
        })

        return res.status(200).json({
            ok : true,
            user : user
        });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok : false
        });
    }
}