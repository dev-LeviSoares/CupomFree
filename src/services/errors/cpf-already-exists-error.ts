export class CpfAlreadyExistsError extends Error {
  constructor() {
    super('Cpf already exists.')
  }
}