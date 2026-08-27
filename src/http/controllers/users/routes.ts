import type { FastifyInstance } from "fastify";
import { register } from "./register-controller.js";
import { authenticate } from "./authenticate-controler.js";
import { searchUserProfile } from "./search-profile-controller.js";
import { refresh } from "./refresh-controller.js";
import { verifyJwt } from "../../middlewares/verify-jwt.js";
import { profile } from "./get-profile-controller.js";
import { verifyUserRole } from "../../middlewares/verify-user-role.js";

export async function userRoutes(app: FastifyInstance) {
  app.get('/search-user', { onRequest: [verifyJwt, verifyUserRole('ADMIN')] } ,searchUserProfile);
  app.get('/me', { onRequest: [verifyJwt]}, profile);
  
  app.post('/register', register);
  app.post('/login', authenticate);

  app.patch('/refresh/token', refresh);
}