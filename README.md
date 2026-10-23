# CRUD de Pessoas — JavaScript + TDD

API REST para cadastrar pessoas (CPF, nome e data de nascimento) com cálculo
automático da idade. Desenvolvida com TDD, ESLint, Prettier, testes unitários e
de integração, e empacotada em imagem Docker.

## Estrutura

```
src/
  utils/idade.js                 cálculo da idade
  utils/cpf.js                   validação e formatação de CPF
  repositories/pessoaRepository  armazenamento em memória
  services/pessoaService.js      regras de negócio do CRUD
  routes/pessoaRoutes.js         rotas HTTP
  app.js / server.js             configuração do Express
tests/
  unit/                          testes unitários
  integration/                   testes de integração (Supertest)
```

## Comandos

| Comando                    | O que faz                         |
| -------------------------- | --------------------------------- |
| `npm ci`                   | instala as dependências           |
| `npm start`                | sobe a API na porta 3000          |
| `npm test`                 | roda todos os testes              |
| `npm run test:unit`        | só testes unitários               |
| `npm run test:integration` | só testes de integração           |
| `npm run test:coverage`    | testes com relatório de cobertura |
| `npm run lint`             | análise estática (ESLint)         |
| `npm run format`           | formata o código (Prettier)       |
| `npm run format:check`     | verifica a formatação             |

## Endpoints

| Método | Rota            | Descrição                              |
| ------ | --------------- | -------------------------------------- |
| GET    | `/pessoas`      | lista todas as pessoas                 |
| GET    | `/pessoas/:cpf` | busca por CPF                          |
| POST   | `/pessoas`      | cria (`cpf`, `nome`, `dataNascimento`) |
| PUT    | `/pessoas/:cpf` | atualiza `nome` e/ou `dataNascimento`  |
| DELETE | `/pessoas/:cpf` | remove                                 |

A data de nascimento usa o formato `YYYY-MM-DD`. Exemplo:

```bash
curl -X POST http://localhost:3000/pessoas \
  -H "Content-Type: application/json" \
  -d '{"cpf":"529.982.247-25","nome":"Maria Silva","dataNascimento":"2000-05-10"}'
# {"cpf":"529.982.247-25","nome":"Maria Silva","dataNascimento":"2000-05-10","idade":26}
```

Erros: `400` dados inválidos, `404` não encontrado, `409` CPF já cadastrado.

## Imagem Docker

```bash
docker build -t crud-pessoas .
docker run -p 3000:3000 crud-pessoas
```

O build roda lint, verificação de formatação e testes; se algo falhar, a imagem não é gerada.

## Versionamento e Pull Request

O histórico já está no repositório (`git log --oneline`). Para publicar e abrir o PR:

```bash
git remote add origin https://github.com/SEU_USUARIO/crud-pessoas.git
git push -u origin main
git push -u origin feature/crud-pessoas
```

No GitHub, abra o PR de `feature/crud-pessoas` para `main` (ou use
`gh pr create --base main --head feature/crud-pessoas --title "feat: CRUD de pessoas" --body-file PULL_REQUEST.md`).
O texto do PR está em `PULL_REQUEST.md`, e o CI roda automaticamente.
