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
      password_hash: await hash('12345678', 6),
    })

    const { users } = await sut.execute({
      query: '123',
      page: 1,
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
      query: 'levisoares@',
      page: 1,
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
      query: 'Levi Soa', page: 1
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
      query: 'non-existing-name', page: 1
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
      query: 'non-existing-cpf', page: 1
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
      query: 'non-existing-email', page: 1
    })

    expect(users).toHaveLength(0)
  });

  it('should be able to fetch paginated users profile search', async () => {
    for (let i = 1; i <= 22; i++) {
      await usersRepository.create({
        cpf: `123.456.789-${i}`,
        email: `levi${i}@test.com`, // único por usuário
        name: `Levi Soares ${i}`,
        password_hash: await hash('12345678', 6),
      })
    }
  
    const { users } = await sut.execute({
      query: 'Levi Soares',
      page: 2
    })
  
    expect(users).toHaveLength(2);
    expect(users).toEqual([
      expect.objectContaining({ name: 'Levi Soares 21' }),
      expect.objectContaining({ name: 'Levi Soares 22' }),
    ])
  })

  it('should be able to list users without a query', async () => {
    await usersRepository.create({
      cpf: '123.456.789-10',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password_hash: await hash('12345678', 6)
    })

    await usersRepository.create({
      cpf: '123.456.789-99',
      email: 'jonatassantos@test.com',
      name: 'Jonatas Santos',
      password_hash: await hash('12345678', 6)
    })
  
    const { users } = await sut.execute({ page: 1 })
  
    expect(users).toHaveLength(2)
  })
})