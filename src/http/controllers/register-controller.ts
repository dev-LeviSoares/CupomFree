import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegisterService } from "../../services/user/make-register-service.js";
import { EmailAlreadyExistsError } from "../../services/errors/email-already-exists-error.js";
import { CpfAlreadyExistsError } from "../../services/errors/cpf-already-exists-error.js";

export async function register (request: FastifyRequest, reply: FastifyReply) {
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
    if( error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: error.message})
    }
    
    if( error instanceof CpfAlreadyExistsError) {
      return reply.status(409).send({ message: error.message})
    }

    return reply.status(500).send()
  }
}