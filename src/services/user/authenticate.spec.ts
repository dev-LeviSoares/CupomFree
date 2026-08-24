import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryUsersRepository } from "../../repositories/memory/memory-user-repository.js";
import { AuthenticateService } from "./authenticate.js";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error.js";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateService;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateService(usersRepository);
  });

  it('should be able to authenticate user', async () => {

    await usersRepository.create({
      cpf: '999.999.999-99',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password_hash: await hash('12345678', 6)
    })

    const { user } = await sut.execute({
      email: 'levisoares@test.com',
      password: '12345678'
    })

    expect(user.id).toEqual(expect.any(String))
  });

  it('should not be able authenticate with wrong email ', async () => {
    await usersRepository.create({
      cpf: '999.999.999-99',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password_hash: '12345678'
    })


    await expect(() => 
      sut.execute({
        email: 'levisoares1@test.com',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  });

  it('should not be able to authenticate with wrong password', async () => {

    await usersRepository.create({
      cpf: '999.999.999-99',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password_hash: '123456789'
    })

    await expect(() => 
      sut.execute({
        email: 'levisoares@test.com',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  });
})