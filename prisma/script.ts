import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import prisma from '../lib/prisma'

const main = async() => {
  const salt = bcrypt.genSaltSync()
  const user = await prisma.user.upsert({
    where: {email: 'user@test.com'},
    update: {},
    create: {
      email: 'user@test.com',
      password: bcrypt.hashSync('password', salt)
    }
  })

  console.log(user)
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
