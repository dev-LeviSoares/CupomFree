import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryUsersRepository } from "../../repositories/memory/memory-user-repository.js";
import { hash } from "bcryptjs";
import { SearchUserProfile } from "./search-user-profile.js";

let usersRepository: InMemoryUsersRepository;
let sut: SearchUserProfile;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new SearchUserProfile(usersRepository);
  });

  it('should be able to search users by cpf', async () => {
    await usersRepository.create({
      cpf: '123.456.789-10',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password_hash: await hash('12345678', 6)
    })

    const { users } = await sut.execute({
      cpf: '123'
    })

    expect(users).toHaveLength(1)
    expect(users[0]).toEqual(
      expect.objectContaining({ 
        name: 'Levi Soares',
        cpf: '123.456.789-10'
      })
    );
  });

  it('should be able to search users by email', async () => {
    await usersRepository.create({
      cpf: '123.456.789-10',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password_hash: await hash('12345678', 6)
    })

    const { users } = await sut.execute({
      email: 'levi'
    })

    expect(users).toHaveLength(1)
    expect(users[0]).toEqual(
      expect.objectContaining({ 
        name: 'Levi Soares',
        email: 'levisoares@test.com',
      })
    );
  });

  it('should be able to search users by name', async () => {
    await usersRepository.create({
      cpf: '123.456.789-10',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password_hash: await hash('12345678', 6)
    })

    const { users } = await sut.execute({
      name: 'Levi'
    })

    expect(users).toHaveLength(1)
    expect(users[0]).toEqual(
      expect.objectContaining({ 
        name: 'Levi Soares',
      })
    );
  });

  it('should return an empty list when no user matches the name', async () => {
    await usersRepository.create({
      cpf: '123.456.789-10',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password_hash: await hash('12345678', 6)
    })

    const { users } = await sut.execute({
      name: 'non-existing-name'
    })

    expect(users).toHaveLength(0)
  });

  it('should return an empty list when no user matches the cpf', async () => {
    await usersRepository.create({
      cpf: '123.456.789-10',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password_hash: await hash('12345678', 6)
    })

    const { users } = await sut.execute({
      cpf: 'non-existing-cpf'
    })

    expect(users).toHaveLength(0)
  });

  it('should return an empty list when no user matches the email', async () => {
    await usersRepository.create({
      cpf: '123.456.789-10',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password_hash: await hash('12345678', 6)
    })

    const { users } = await sut.execute({
      email: 'non-existing-email'
    })

    expect(users).toHaveLength(0)
  });
})