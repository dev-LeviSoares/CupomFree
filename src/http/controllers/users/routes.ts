import type { FastifyInstance } from "fastify";
import { register } from "./register-controller.js";
import { authenticate } from "./authenticate-controler.js";
import { searchUserProfile } from "./search-user-profile-controller.js";

export async function userRoutes(app: FastifyInstance) {
  app.post('/register', register);
  app.post('/login', authenticate);

  app.get('/me', searchUserProfile);
}