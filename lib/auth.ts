import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'

export const validateRoute = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.PASS

    if (token) {
      let user

      try {
        const { id }: any = jwt.verify(token, 'hello')
        user = await prisma.user.findUnique({
          where: { 
            userId: id,
          },
        })

        // console.log(user)

        if (!user) {
          throw new Error('Not real user')
        }
      } catch (error) {
        res.status(401)
        res.json({ error: 'Not Authorizied' })
        return
      }

      return handler(req, res, user)
    }

    res.status(401)
    res.json({ error: 'Not Authorizied' })
  }
}

export const validateToken = (token: any) => {
  const user = jwt.verify(token, 'hello')
  return user
}