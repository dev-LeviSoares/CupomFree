import type { FastifyRequest, FastifyReply } from "fastify";

export async function health (request: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send({
    message: "CupomFree funcionando!"
  })
}