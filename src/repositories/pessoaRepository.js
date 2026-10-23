/**
 * Repositório em memória. A chave é o CPF somente com dígitos.
 */
class PessoaRepository {
  constructor() {
    this.dados = new Map();
  }

  salvar(pessoa) {
    this.dados.set(pessoa.cpf, { ...pessoa });
    return { ...pessoa };
  }

  buscar(cpf) {
    const pessoa = this.dados.get(cpf);
    return pessoa ? { ...pessoa } : null;
  }

  listar() {
    return [...this.dados.values()].map((p) => ({ ...p }));
  }

  remover(cpf) {
    return this.dados.delete(cpf);
  }

  limpar() {
    this.dados.clear();
  }
}

module.exports = PessoaRepository;
