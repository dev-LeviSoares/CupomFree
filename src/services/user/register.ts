import { hash } from 'bcryptjs';
import type { User } from '../../generated/prisma/client.js';
import type { UsersRepository } from '../../repositories/users-repository.js';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error.js';

interface RegisterServiceRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

interface RegisterServiceResponse {
  user: User;
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository){}

  async execute({name, cpf, email, password}: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if(userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const cpfWithSameCpf = await this.usersRepository.findByCpf(cpf);
    
    if(cpfWithSameCpf) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      cpf,
      password_hash
    })

    return {
      user
    }
  }
}
