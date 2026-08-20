## Qual a função do Repository?

- Eles dizem quais operações cada domínio precisa, sem dizer como os dados são gravados.
- É o Repository Pattern + o D do SOLID (inversão de dependência).

Não têm implementação. Só a assinatura dos métodos.

# Por que existem?

Os casos de uso(service) dependem da interface, não do Prisma. Assim a regra de negócio não sabe se o dado está no Postgres, em memória ou em outro lugar.

-- De certa forma, ele ainda depende um pouco do Prisma para as tipagens. No entanto, esse é um trade-off válido. Através disso, você não precisara criar DTOs.