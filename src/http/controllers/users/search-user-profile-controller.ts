import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { makeSearchUserService } from "../../../services/user/factories/make-search-user-profile.js";
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error.js";

export async function searchUserProfile(request: FastifyRequest, reply: FastifyReply) {
  const searchUsersQuerySchema = z.union([
    z.strictObject({ name: z.string().min(2) }),
    z.strictObject({ email: z.string().min(2) }),
    z.strictObject({ cpf: z.string().min(2) }),
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