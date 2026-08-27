import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-user-repository.js";
import { GetUserProfile } from "../get-user-profile.js";

export function makeGetUserService() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfile(usersRepository);

  return useCase;
}
