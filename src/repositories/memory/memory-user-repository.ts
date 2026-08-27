import { randomUUID } from "node:crypto";
import type { Prisma, User } from "../../generated/prisma/client.js";
import type { UsersRepository } from "../users-repository.js";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if(!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if(!user) {
      return null
    }

    return user
  }

  async findByCpf(cpf: string) {
    const user = this.items.find((item) => item.cpf === cpf);

    if(!user) {
      return null
    }

    return user
  }

  async findManyBy(query: string, page: number){
    const term = query.toLowerCase()

    const users = this.items.filter((items) => 
      items.email.toLowerCase().includes(term) ||
      items.cpf.toLowerCase().includes(term) ||
      items.name.toLowerCase().includes(term)
    ).slice((page - 1) * 20, page * 20);

    return users
  }

  async create (data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      role: data.role ?? 'MEMBER',
      password_hash: data.password_hash,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(user);

    return user;
  }
}