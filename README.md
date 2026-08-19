# API

CupomFree api.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível o usuário visualizar todos os planos;
- [ ] Deve ser possível cadastrar um plano;
- [ ] Deve ser possível editar um plano;
- [ ] Deve ser possível excluir um plano;
- [ ] Deve ser possível cadastrar um cupom;
- [ ] Deve ser possível validar o cupom de um usuário;
- [ ] Deve ser possível o criar uma assiantura;
- [ ] Deve ser possível o cancelar uma assinatura;
- [ ] Deve ser possível obter o número de assinaturas realizadas pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de assinaturas;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode ter mais de 1 assinatura ativa;
- [ ] O usuário não pode utilizar beneficios caso não tenha assinatura;
- [ ] Os cupons só podem ser criado, editado, cancelado por administradpres;
- [ ] Os planos só podem ser criado, editado, cancelado por administradpres;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;
- [ ] O usuário e o administrador pode criar uma assinatura;
- [ ] O usuário e o administrador podem cancelar uma assinatura;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginados com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);