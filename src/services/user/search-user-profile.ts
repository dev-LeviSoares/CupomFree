import type { User } from "../../generated/prisma/client.js";
import type { UsersRepository } from "../../repositories/users-repository.js";

type GetUserProfileRequest =
  | { name: string; page: number }
  | { cpf: string; page: number }
  | { email: string; page: number };

interface GetUserProfileResponse {
  users: User[];
}

export class SearchUserProfile {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    request: GetUserProfileRequest,
  ): Promise<GetUserProfileResponse> {
    
    const { page } = request;
    const query =
      "cpf" in request
        ? request.cpf
        : "email" in request
          ? request.email
          : request.name;

    const users = await this.usersRepository.findManyBy(query, page);

    return {
      users,
    };
  }
}
