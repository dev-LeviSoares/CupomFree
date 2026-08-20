import { prisma } from "../../lib/prisma.js";
import type { UsersRepository } from "../users-repository.js";
import { Prisma, type User} from "../../generated/prisma/client.js";

export class PrismaUsersRepository implements UsersRepository {
  async create (data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user;
  }

  async findByCpf (cpf: string): Promise<User | null> {
    const userCpf = await prisma.user.findUnique({
      where: {
        cpf
      }
    })

    return userCpf;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEmail = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return userEmail;
  }

  async findById(id: string): Promise<User | null> {
    const userId = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return userId;
  }
}