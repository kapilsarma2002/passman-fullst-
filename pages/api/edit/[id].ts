import { validateRoute } from "../../../lib/auth"
import { useState } from 'react'
import prisma from "../../../lib/prisma"
import process from "process"
import CryptoAES from 'crypto-js/aes';

export default validateRoute(async (req: any, res: any, user: any) => {

  const { password1 } = req.body
  const websiteId = req.body.id
  const { REACT_APP_SUPER_KEY } = process.env;  
  const key = REACT_APP_SUPER_KEY as string
  const encryptedPass = CryptoAES.encrypt(password1, key).toString()

  try {

    await prisma.userInfo.update({
       
      where: {
        id: +websiteId,
      },

      data: {
        encryptedPassword: encryptedPass,
      },     
      
    })
  
    res.json('successfully updated!')

  } catch(e) {
    res.status(403)
    res.json('password updation error')
  }
})