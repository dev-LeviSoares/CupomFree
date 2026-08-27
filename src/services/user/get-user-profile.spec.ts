import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryUsersRepository } from "../../repositories/memory/memory-user-repository.js";
import { hash } from "bcryptjs";
import { GetUserProfile } from "./get-user-profile.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfile;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfile(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      cpf: '123.456.789-10',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password_hash: await hash('12345678', 6),
    })

    const { user } = await sut.execute({
      id: createdUser.id
    })

    expect(user.name).toEqual('Levi Soares')
  });

  it('should not be able to get user profile', async () => {


    await expect(() => 
      sut.execute({
       id: 'non-existing--id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);

  });
})