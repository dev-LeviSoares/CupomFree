import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { makeAuthenticateService } from "../../../services/user/make-authenticate-service.js";
import { InvalidCredentialsError } from "../../../services/errors/invalid-credentials-error.js";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(8)
  });
  
  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateService = makeAuthenticateService();

    const { user } = await authenticateService.execute({
      email,
      password
    });

    return reply.status(200).send({ message: 'User logged.'})

  } catch (error ) {
    if( error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message})
    }

    return reply.status(500).send();
  }
}