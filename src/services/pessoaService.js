const { validarCpf, limparCpf, formatarCpf } = require('../utils/cpf');
const { calcularIdade } = require('../utils/idade');
const { ValidacaoError, NaoEncontradoError, ConflitoError } = require('../errors');

class PessoaService {
  /**
   * @param {import('../repositories/pessoaRepository')} repository
   * @param {() => Date} [agora] função que retorna a data atual (injetável para testes)
   */
  constructor(repository, agora = () => new Date()) {
    this.repository = repository;
    this.agora = agora;
  }

  criar({ cpf, nome, dataNascimento } = {}) {
    if (!validarCpf(cpf)) {
      throw new ValidacaoError('CPF inválido');
    }
    const chave = limparCpf(cpf);
    const pessoa = {
      cpf: chave,
      nome: this.#validarNome(nome),
      dataNascimento: this.#validarData(dataNascimento),
    };
    if (this.repository.buscar(chave)) {
      throw new ConflitoError('CPF já cadastrado');
    }
    return this.#apresentar(this.repository.salvar(pessoa));
  }

  listar() {
    return this.repository.listar().map((p) => this.#apresentar(p));
  }

  buscarPorCpf(cpf) {
    return this.#apresentar(this.#obter(cpf));
  }

  atualizar(cpf, { nome, dataNascimento } = {}) {
    const atual = this.#obter(cpf);
    const atualizada = {
      ...atual,
      nome: nome === undefined ? atual.nome : this.#validarNome(nome),
      dataNascimento:
        dataNascimento === undefined
          ? atual.dataNascimento
          : this.#validarData(dataNascimento),
    };
    return this.#apresentar(this.repository.salvar(atualizada));
  }

  remover(cpf) {
    const pessoa = this.#obter(cpf);
    this.repository.remover(pessoa.cpf);
  }

  #obter(cpf) {
    const pessoa = this.repository.buscar(limparCpf(cpf));
    if (!pessoa) {
      throw new NaoEncontradoError();
    }
    return pessoa;
  }

  #validarNome(nome) {
    const limpo = typeof nome === 'string' ? nome.trim() : '';
    if (!limpo) {
      throw new ValidacaoError('Nome é obrigatório');
    }
    return limpo;
  }

  #validarData(dataNascimento) {
    try {
      calcularIdade(dataNascimento, this.agora());
    } catch (erro) {
      throw new ValidacaoError(erro.message);
    }
    return dataNascimento;
  }

  #apresentar(pessoa) {
    return {
      cpf: formatarCpf(pessoa.cpf),
      nome: pessoa.nome,
      dataNascimento: pessoa.dataNascimento,
      idade: calcularIdade(pessoa.dataNascimento, this.agora()),
    };
  }
}

module.exports = PessoaService;
