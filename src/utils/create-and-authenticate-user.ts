import type { FastifyInstance } from "fastify";
import request from "supertest";
import { prisma } from "../lib/prisma.js";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await request(app.server).post("/register").send({
      cpf: '999.999.999-99',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password: '12345678'
  });

  if (isAdmin) {
    await prisma.user.update({
      where: { email: 'levisoares@test.com'},
      data: { role: 'ADMIN' },
    });
  }

  const authResponse = await request(app.server).post("/login").send({
    email: 'levisoares@test.com',
    password: '12345678',
  });

  const { token } = authResponse.body;

  return {
    token,
  };
}
