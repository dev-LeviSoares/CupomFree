import type { User } from "../../generated/prisma/client.js";
import type { UsersRepository } from "../../repositories/users-repository.js";

type SearchUsersRequest = {
  query?: string | undefined
  page: number
}

interface GetUserProfileResponse {
  users: User[];
}

export class SearchUserProfile {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    request: SearchUsersRequest,
  ): Promise<GetUserProfileResponse> {

    const users = await this.usersRepository.findManyBy(request.query, request.page);

    return {
      users,
    };
  }
}
