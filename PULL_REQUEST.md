# feat: CRUD de pessoas com cálculo de idade

**Branch:** `feature/crud-pessoas` → `main`

## Descrição

Implementa uma API REST em JavaScript (Node.js + Express) para cadastro de pessoas
com CPF, nome e data de nascimento, retornando a idade calculada.

## O que foi feito

- Cálculo de idade com tratamento de aniversário no ano, datas inválidas e futuras
- Validação de CPF pelos dígitos verificadores (aceita com ou sem máscara)
- Serviço com as regras do CRUD (CPF único, nome obrigatório, atualização parcial)
- Rotas REST: `GET/POST /pessoas`, `GET/PUT/DELETE /pessoas/:cpf`
- Análise estática com ESLint e formatação com Prettier
- 32 testes unitários e 7 testes de integração (Jest + Supertest)
- Dockerfile multi-stage (o build da imagem roda lint e testes)
- Pipeline de CI no GitHub Actions

## Desenvolvimento com TDD

Cada funcionalidade tem um commit `test: ... (red)` com os testes falhando,
seguido de um commit `feat: ... (green)` com a implementação.

## Como testar

```bash
npm ci
npm run lint && npm run format:check
npm test
docker build -t crud-pessoas . && docker run -p 3000:3000 crud-pessoas
```
