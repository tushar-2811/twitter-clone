import {NextApiRequest , NextApiResponse} from 'next'
import prisma from '@/libs/Prismadb'
import jwt from 'jsonwebtoken'
import { FaLastfmSquare } from 'react-icons/fa';


export default async function handler(
    req : NextApiRequest,
    res : NextApiResponse
) {
    if(req.method !== 'GET') {
        return res.status(403).end();
    }
    
   try {
    if(!req.headers.authorization) {
        return res.status(403).json({
            ok : false,
            msg : "user not authenticated"
        })
    }
    const token = req.headers.authorization?.split(' ').at(1);
    if(!token) {
        return res.status(403).json({
            ok : false , 
            msg : "unauthorized"
        })
    }

    const jwtsecret = process.env.JWT_SECRET || "jwt_secret";
    const user =  jwt.verify(token , jwtsecret);

    if(!user) {
        return res.status(403).json({
            ok : false
        })
    }
    // checking if any user exist with this id
    
    // console.log(typeof req.headers.authorization)

    const allUsers = await prisma.user.findMany({
        orderBy : {
            createdAt : 'desc'
        }
    })

    return res.status(200).json({
        ok : true,
        user  : allUsers
    })
    
   } catch (error) {
      console.log(error);
      return res.status(403).json({
        ok : false,
        error
      })
   }

}