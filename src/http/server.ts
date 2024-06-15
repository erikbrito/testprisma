import fastify from 'fastify'
import { z } from 'zod'
import { hash } from "bcrypt"
import { Login } from "../controllers/auth"
import prisma from '../db/prisma'

const app = fastify()

app.get('/', () => {
  return 'ok'
})

app.post('/register', async (request) => {
  const createRegisterBody = z.object({
    email: z.string(),
    name: z.string(),
    password: z.string()
  })
 const{ email, name, password } = createRegisterBody.parse(request.body)

//  const{ email, user, password } = request.body

 
 const register = await prisma.login.create({
   data: {
    email,
    name,
    password: await hash(password, 10)
    }
  })

  return register
})

app.post('/login', Login)

app.listen({ port: 3333 }).then(() =>  {
  console.log('HTTP Server running!')
})