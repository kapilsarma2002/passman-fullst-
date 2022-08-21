/* eslint-disable import/no-anonymous-default-export */
import bcrypt from 'bcrypt'
import prisma from '../../lib/prisma'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    }
  })

  console.log(email, password)

  if(user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.userId,
        email: user.email,
        time: Date.now(),
      }, 'hello',
      {
        expiresIn: '8h',
      }
    ) 

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('PASS', token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production', 
      })
    )
    res.json(user)
  } else {
    res.status(401)
    res.json({error: 'User email or password is wrong!'})
  }
}