import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryUsersRepository } from "../../repositories/memory/memory-user-repository.js";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error.js";
import { RegisterService } from "./register.js";
import { compare } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterService;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterService(usersRepository);
  });

  it('should be able to register user', async () => {
    const { user } = await sut.execute({
      cpf: '999.999.999-99',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password: '12345678'
    })

    expect(user.id).toEqual(expect.any(String))
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      cpf: '999.999.999-99',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password: '12345678'
    })

    const isPasswordCorrectlyHashed = await compare(
      '12345678', user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  });

  it('should not be able to register with same email twice', async () => {
    const email = 'levisoares@test.com';

    await sut.execute({
      cpf: '999.999.999-92',
      email,
      name: 'Levi Soares',
      password: '12345678'
    });

    await expect(() => 
      sut.execute({
        cpf: '999.999.999-91',
        email,
        name: 'Levi Soares',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  });

  it('should not be able to register with same cpf twice', async () => {
    const cpf = '999.999.999-99';

    await sut.execute({
      cpf,
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password: '12345678'
    });

    await expect(() => 
      sut.execute({
        cpf,
        email: 'levisoares1@test.com',
        name: 'Levi Soares',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})