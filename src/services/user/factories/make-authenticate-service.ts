import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-user-repository.js";
import { AuthenticateService } from "../authenticate.js";

export function makeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new AuthenticateService(usersRepository);

  return useCase;
}