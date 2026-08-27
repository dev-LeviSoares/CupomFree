import type { FastifyInstance } from "fastify";
import { register } from "./register-controller.js";
import { authenticate } from "./authenticate-controler.js";
import { searchUserProfile } from "./search-user-profile-controller.js";
import { refresh } from "./refresh-controller.js";
import { verifyJwt } from "../../middlewares/verify-jwt.js";

export async function userRoutes(app: FastifyInstance) {
  app.get('/search-user', { onRequest: [verifyJwt] } ,searchUserProfile);
  
  app.post('/register', register);
  app.post('/login', authenticate);

  app.patch('/refresh/token', refresh);
}