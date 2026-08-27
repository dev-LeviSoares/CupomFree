import type { User } from "../../generated/prisma/client.js";
import type { UsersRepository } from "../../repositories/users-repository.js";

type GetUserProfileRequest = {name: string} | {cpf: string} | {email: string}

interface GetUserProfileResponse {
  users: User[]
}

export class SearchUserProfile {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const query = 'cpf' in request ? request.cpf 
    : 'email' in request ? request.email
    : request.name

    const users = await this.usersRepository.findManyBy(query);

    return {
      users
    }
  } 
}