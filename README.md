# API

CupomFree api.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil por email, cpf ou nome usuário;
- [x] Deve ser possível obter o usuário obter seu perfil;
- [ ] Deve ser possível obter o número de assinaturas realizadas pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de assinaturas;
- [ ] Deve ser possível cadastrar um plano;
- [ ] Deve ser possível editar um plano;
- [ ] Deve ser possível ativar/desativar um plano;
- [ ] Deve ser possível excluir um plano;
- [ ] Deve ser possível o usuário visualizar todos os planos;
- [ ] Deve ser possível cadastrar um cupom;
- [ ] Deve ser possível editar um cupom;
- [ ] Deve ser possível cancelar um cupom;
- [ ] Deve ser possível validar o cupom de um usuário;
- [ ] Deve ser possível o criar uma assiantura;
- [ ] Deve ser possível o cancelar uma assinatura;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não deve poder se cadastrar com um cpf duplicado;
- [ ] O usuário não pode ter mais de 1 assinatura ativa;
- [ ] O usuário não pode utilizar beneficios caso não tenha assinatura;
- [ ] Os cupons só podem ser criado, editado, cancelado por administradores;
- [ ] Os planos só podem ser criado, editado, cancelado por administradores;
- [ ] O usuário e o administrador pode criar uma assinatura;
- [ ] O usuário e o administrador podem cancelar uma assinatura;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginados com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);