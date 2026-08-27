import type { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetUserService } from '../../../services/user/factories/make-get-user-profile.js';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfileService = makeGetUserService()

  const { user } = await getUserProfileService.execute({
    id: request.user.sub
  });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined
    }
  })
}