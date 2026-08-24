import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegisterService } from "../../../services/user/make-register-service.js";
import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error.js";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    cpf: z.string(),
    password: z.string().min(8)
  });

  const { name, email, cpf, password } = registerBodySchema.parse(request.body);

  try {
    const registerService = makeRegisterService();
    
    await registerService.execute({
      name,
      email,
      cpf,
      password
    });

    return reply.status(201).send({ message: "User created"})

  } catch (error) {
    if( error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message})
    }
    
    return reply.status(500).send()
  }
}