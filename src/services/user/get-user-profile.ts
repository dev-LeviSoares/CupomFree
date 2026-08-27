import type { User } from "../../generated/prisma/client.js";
import type { UsersRepository } from "../../repositories/users-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface GetUserProfileRequest {
  id: string;
}

interface GetUserProfileResponse {
  user: User
}

export class GetUserProfile {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: GetUserProfileRequest): Promise<GetUserProfileResponse> {

    const user = await this.usersRepository.findById(id);

    if(!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user
    }
  }
}