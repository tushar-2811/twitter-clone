import {NextApiRequest , NextApiResponse} from 'next'
import prisma from '@/libs/Prismadb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== 'POST') {
        return res.status(405).end();
    }

    const {email , password} = req.body;
    const existingUser = await prisma.user.findUnique({
        where : {
            email : email
        }
    })

    if(!existingUser || !existingUser?.hashedPassword) {
        return res.status(500).json({
            ok : false,
            msg : "user not found"
        })
    }

    // if(!existingUser?.email || !existingUser?.hashedPassword) {
    //      return res.status(500).json({
    //         ok : false,
    //         msg : "error in finding user"
    //      })
    // }

    const isCompare = await bcrypt.compare(password , existingUser.hashedPassword)
    if(!isCompare) {
        return res.status(401).json({
            ok : false,
            msg : "password don't match"
        })
    }
    
    const JWT_SECRET = process.env.JWT_SECRET;
    if(!JWT_SECRET) {
        return res.status(401).json({
            ok : false,
            msg : "error in jwt secret key"
        })
    }
    const token = jwt.sign({id : existingUser.id} , JWT_SECRET , {expiresIn : "7d"})

    return res.status(201).json({
        ok : true,
        token : token,
        user : existingUser
    })
}