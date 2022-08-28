/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";

export default async(req: NextApiRequest, res: NextApiResponse) => {
  const {username, usermail, password, url} = req.body
  console.log(username, usermail, password, url)
  res.json('successfully added!')
}