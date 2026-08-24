# Prisma Environment

É um ambiente customizado do Vitest só para testes e2e.

### O objeto dele é preparar e limpar o banco em vlta de cada arquivo de teste e2e.

- Ele gera um schema Postgres aleatório utilizando o randomUUID();
- Troca o DATABASE_URL para usar esse schema.
- Roda "prisma migrate deploy" - cria as tabelas só nesse schema.
- Depois ele executa o teardown() - Apga o schema e desconecta o Prisma.

Assim cada arquivo e2e roda num banco isolado: não suja o banco de desenvolvimento, não briga com outro teste, e no fim some.