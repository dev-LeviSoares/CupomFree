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
    const user = await prisma.user.findUnique({
      where: {
        cpf
      }
    })

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user;
  }

  async findManyBy(query: string, page: number): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              contains: query,
              mode: "insensitive",
            }
          },
          {
            cpf: {
              contains: query,
              mode: "insensitive",
            }
          },
          {
            name: {
              contains: query,
              mode: "insensitive",
            }
          },
        ]
      },
      take: 20,
      skip: (page - 1) * 20,
      orderBy: { created_at: 'asc' },
    });

    return users
  }
}