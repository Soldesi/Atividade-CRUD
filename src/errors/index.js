class ValidacaoError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidacaoError';
    this.status = 400;
  }
}

class NaoEncontradoError extends Error {
  constructor(message = 'Pessoa não encontrada') {
    super(message);
    this.name = 'NaoEncontradoError';
    this.status = 404;
  }
}

class ConflitoError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflitoError';
    this.status = 409;
  }
}

module.exports = { ValidacaoError, NaoEncontradoError, ConflitoError };
