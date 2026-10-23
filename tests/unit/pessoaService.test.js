const PessoaService = require('../../src/services/pessoaService');
const PessoaRepository = require('../../src/repositories/pessoaRepository');

describe('PessoaService', () => {
  const hoje = new Date('2026-10-23T12:00:00Z');
  let service;

  beforeEach(() => {
    service = new PessoaService(new PessoaRepository(), () => hoje);
  });

  const dadosValidos = {
    cpf: '529.982.247-25',
    nome: 'Maria Silva',
    dataNascimento: '2000-05-10',
  };

  describe('criar', () => {
    it('cria uma pessoa e retorna com a idade calculada', () => {
      const pessoa = service.criar(dadosValidos);
      expect(pessoa).toEqual({
        cpf: '529.982.247-25',
        nome: 'Maria Silva',
        dataNascimento: '2000-05-10',
        idade: 26,
      });
    });

    it('remove espaços extras do nome', () => {
      expect(service.criar({ ...dadosValidos, nome: '  Maria Silva ' }).nome).toBe(
        'Maria Silva',
      );
    });

    it('rejeita CPF inválido', () => {
      expect(() => service.criar({ ...dadosValidos, cpf: '123.456.789-00' })).toThrow(
        'CPF inválido',
      );
    });

    it('rejeita nome vazio', () => {
      expect(() => service.criar({ ...dadosValidos, nome: '   ' })).toThrow(
        'Nome é obrigatório',
      );
    });

    it('rejeita data de nascimento inválida', () => {
      expect(() => service.criar({ ...dadosValidos, dataNascimento: 'abc' })).toThrow(
        'Data de nascimento inválida',
      );
    });

    it('rejeita data de nascimento futura', () => {
      expect(() =>
        service.criar({ ...dadosValidos, dataNascimento: '2027-01-01' }),
      ).toThrow('Data de nascimento no futuro');
    });

    it('rejeita CPF duplicado, mesmo com formatação diferente', () => {
      service.criar(dadosValidos);
      expect(() => service.criar({ ...dadosValidos, cpf: '52998224725' })).toThrow(
        'CPF já cadastrado',
      );
    });
  });

  describe('listar e buscar', () => {
    it('lista todas as pessoas', () => {
      service.criar(dadosValidos);
      service.criar({ ...dadosValidos, cpf: '111.444.777-35', nome: 'João' });
      expect(service.listar()).toHaveLength(2);
    });

    it('busca pessoa pelo CPF', () => {
      service.criar(dadosValidos);
      expect(service.buscarPorCpf('52998224725').nome).toBe('Maria Silva');
    });

    it('lança erro ao buscar CPF inexistente', () => {
      expect(() => service.buscarPorCpf('111.444.777-35')).toThrow(
        'Pessoa não encontrada',
      );
    });
  });

  describe('atualizar', () => {
    it('atualiza nome e data de nascimento e recalcula a idade', () => {
      service.criar(dadosValidos);
      const atualizada = service.atualizar('529.982.247-25', {
        nome: 'Maria Souza',
        dataNascimento: '1990-12-01',
      });
      expect(atualizada).toMatchObject({ nome: 'Maria Souza', idade: 35 });
    });

    it('permite atualização parcial', () => {
      service.criar(dadosValidos);
      const atualizada = service.atualizar('529.982.247-25', { nome: 'Maria Souza' });
      expect(atualizada).toMatchObject({
        nome: 'Maria Souza',
        dataNascimento: '2000-05-10',
      });
    });

    it('valida os dados na atualização', () => {
      service.criar(dadosValidos);
      expect(() => service.atualizar('529.982.247-25', { nome: '' })).toThrow(
        'Nome é obrigatório',
      );
    });

    it('lança erro ao atualizar CPF inexistente', () => {
      expect(() => service.atualizar('111.444.777-35', { nome: 'X' })).toThrow(
        'Pessoa não encontrada',
      );
    });
  });

  describe('remover', () => {
    it('remove a pessoa', () => {
      service.criar(dadosValidos);
      service.remover('529.982.247-25');
      expect(service.listar()).toHaveLength(0);
    });

    it('lança erro ao remover CPF inexistente', () => {
      expect(() => service.remover('111.444.777-35')).toThrow('Pessoa não encontrada');
    });
  });
});
