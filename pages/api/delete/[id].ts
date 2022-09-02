import { validateRoute } from "../../../lib/auth"
import prisma from "../../../lib/prisma"

export default validateRoute(async (req: any, res: any, user: any) => {

  const websiteId = req.body.id


  try {

    await prisma.userInfo.delete({
       
      where: {
        id: +websiteId,
      },   
      
    })
  
    res.json('successfully deleted!')

  } catch(e) {
    res.status(403)
    res.json('password deletion error')
  }
})