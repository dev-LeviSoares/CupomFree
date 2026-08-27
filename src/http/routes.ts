import type { FastifyInstance} from "fastify";
import { health } from "./controllers/health-controller.js";
import { register } from "./controllers/users/register-controller.js";

export async function appRoutes( app: FastifyInstance) {
  app.get('/health', health);
}