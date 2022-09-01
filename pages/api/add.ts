import { validateRoute } from "../../lib/auth"
import { useState } from 'react'
import prisma from "../../lib/prisma"
import process from "process"
import CryptoAES from 'crypto-js/aes';

export default validateRoute(async (req: any, res: any, user: any) => {

  const { username, usermail, password, url } = req.body
  const id = user.userId
  const { REACT_APP_SUPER_KEY } = process.env;  
  const key = REACT_APP_SUPER_KEY as string
  // const key = 'MySuPeRsEcReTpASsWoRd'
  const encryptedPass = CryptoAES.encrypt(password, key).toString()

  try {

    const UserInfo = await prisma.userInfo.create({
      data: {
        userId: id,
        accountName: username,
        accountEmail: usermail,
        encryptedPassword: encryptedPass,
        websiteURL: url
      }
    })
  
    res.json('successfully added!')

  } catch(e) {
    res.status(402)
    res.json('password encryption error')
  }
})