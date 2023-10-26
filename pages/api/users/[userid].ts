import {NextApiRequest , NextApiResponse} from 'next'
import prisma from '@/libs/Prismadb'
import { FaLessThan } from 'react-icons/fa';


export default async function handler(
    req : NextApiRequest,
    res : NextApiResponse
) {
     if(req.method !== 'GET') {
        return res.status(403).end();
     }

     try {
        const {userid} = req.query;
        console.log(userid);
        if(!userid || typeof userid !== 'string') {
             return res.status(403).json({
                ok : false,
                msg : "error in user Id"
             })
        }
         
        const existingUser = await prisma.user.findUnique({
            where : {
                id : userid
            }
        })

        // if(!existingUser) {
        //     return res.status(403).json({
        //         ok : false,
        //         msg : "error in finding user"
        //     })
        // }

        const followerCount = await prisma.user.count({
            where : {
               followingIds : {
                  has : userid
               }
            }
        })

        return res.status(200).json({
            ok : true,
            user : existingUser,
            followers :  followerCount
        })
        
     } catch (error) {
        console.log(error);
        return res.status(403).json({
            ok : false,
            error
        })
     }
}