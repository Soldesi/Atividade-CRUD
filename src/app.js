const express = require('express');
const PessoaRepository = require('./repositories/pessoaRepository');
const PessoaService = require('./services/pessoaService');
const criarPessoaRoutes = require('./routes/pessoaRoutes');

function criarApp({ repository = new PessoaRepository(), agora } = {}) {
  const app = express();
  const service = new PessoaService(repository, agora);

  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/pessoas', criarPessoaRoutes(service));

  app.use((erro, _req, res, _next) => {
    if (erro.type === 'entity.parse.failed') {
      return res.status(400).json({ erro: 'JSON inválido' });
    }
    const status = erro.status || 500;
    const mensagem = status === 500 ? 'Erro interno do servidor' : erro.message;
    return res.status(status).json({ erro: mensagem });
  });

  return app;
}

module.exports = { criarApp };
