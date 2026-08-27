import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { makeAuthenticateService } from "../../../services/user/factories/make-authenticate-service.js";
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

    const token = await reply.jwtSign(
      {
        role: user.role,
        name: user.name
      },
      {
        sign: {
          sub: user.id
        }
      }
    )

    const refreshToken = await reply.jwtSign(
      { 
        role: user.role,
        name: user.name
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        }
      }
    );
    
    return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token: token })
  
  } catch (error ) {
    if( error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message})
    }

    return reply.status(500).send();
  }
}