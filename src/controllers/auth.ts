import { FastifyRequest, FastifyReply } from 'fastify'
import { compare } from "bcrypt"
import prisma from '../db/prisma'
import { z } from 'zod'

const Login = async (req:FastifyRequest, res:FastifyReply) => {
  const createRegisterBody = z.object({
    email: z.string(),
    password: z.string()
  })
 const{ email, password } = createRegisterBody.parse(req.body) 
 
 const login = await prisma.login.findFirst({
  where: { email }
   }
)

if (login) {
    try{
      const lalala = await compare(password, login.password)
      if(lalala){
        return res.send('Login ok!')
      } else {
        return res.status(401).send('erro password')
      }
    } catch (e){
      console.log(e)
    }
  } else {
    return res.status(401).send('invalid password')
  }
}

export {Login}