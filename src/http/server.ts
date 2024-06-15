import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { hashSync } from "bcrypt"

const app = fastify()

const prisma = new PrismaClient()

app.get('/', () => {
  return 'ok'
})

app.post('/register', async (request) => {
  const createRegisterBody = z.object({
    email: z.string(),
    user: z.string(),
    password: z.string()
  })
 const{ email, user, password } = createRegisterBody.parse(request.body)

//  const{ email, user, password } = request.body

 
 const register = await prisma.login.create({
   data: {
    email,
    user,
    password: hashSync(password, 10)
    }
  })
  
  console.log(email, user, password)

  return register
})

app.listen({ port: 3333 }).then(() =>  {
  console.log('HTTP Server running!')
})