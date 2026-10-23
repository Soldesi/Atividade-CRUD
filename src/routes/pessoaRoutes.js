const { Router } = require('express');

function criarPessoaRoutes(service) {
  const router = Router();

  router.get('/', (_req, res) => {
    res.json(service.listar());
  });

  router.get('/:cpf', (req, res) => {
    res.json(service.buscarPorCpf(req.params.cpf));
  });

  router.post('/', (req, res) => {
    res.status(201).json(service.criar(req.body));
  });

  router.put('/:cpf', (req, res) => {
    res.json(service.atualizar(req.params.cpf, req.body));
  });

  router.delete('/:cpf', (req, res) => {
    service.remover(req.params.cpf);
    res.status(204).send();
  });

  return router;
}

module.exports = criarPessoaRoutes;
