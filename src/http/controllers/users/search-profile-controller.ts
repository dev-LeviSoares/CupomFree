import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { makeSearchUserService } from "../../../services/user/factories/make-search-user-profile.js";

export async function searchUserProfile(request: FastifyRequest, reply: FastifyReply) {
  const searchUsersQuerySchema = z.union([
    z.strictObject({
      name: z.string().min(2),
      page: z.coerce.number().min(1).default(1),
    }),
    z.strictObject({
      email: z.string().min(2),
      page: z.coerce.number().min(1).default(1),
    }),
    z.strictObject({
      cpf: z.string().min(2),
      page: z.coerce.number().min(1).default(1),
    }),
  ])

  const identifier = searchUsersQuerySchema.parse(request.query);

  const searchUserService = makeSearchUserService();

  const { users } = await searchUserService.execute(identifier);

  return reply.status(200).send({
    users: users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
    })),
  })
}