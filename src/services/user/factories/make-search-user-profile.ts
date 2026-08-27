import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-user-repository.js";
import { SearchUserProfile } from "../search-user-profile.js";

export function makeSearchUserService() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new SearchUserProfile(usersRepository);

  return useCase;
}
