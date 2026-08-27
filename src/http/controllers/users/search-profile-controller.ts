import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { makeSearchUserService } from "../../../services/user/factories/make-search-user-profile.js";

export async function searchUserProfile(request: FastifyRequest, reply: FastifyReply) {
  const searchUsersQuerySchema = z.object({
    q: z.string().min(2).optional(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchUsersQuerySchema.parse(request.query)

  const searchUserService = makeSearchUserService();

  const { users } = await searchUserService.execute({ query: q, page });

  return reply.status(200).send({
    users: users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
    })),
  })
}