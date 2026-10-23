const { calcularIdade } = require('../../src/utils/idade');

describe('calcularIdade', () => {
  const hoje = new Date('2026-10-23T12:00:00Z');

  it('calcula a idade quando o aniversário já passou no ano', () => {
    expect(calcularIdade('2000-05-10', hoje)).toBe(26);
  });

  it('calcula a idade quando o aniversário ainda não chegou no ano', () => {
    expect(calcularIdade('2000-12-01', hoje)).toBe(25);
  });

  it('considera que no dia do aniversário a pessoa já completou a idade', () => {
    expect(calcularIdade('2000-10-23', hoje)).toBe(26);
  });

  it('retorna 0 para quem nasceu hoje', () => {
    expect(calcularIdade('2026-10-23', hoje)).toBe(0);
  });

  it('lança erro para data de nascimento no futuro', () => {
    expect(() => calcularIdade('2030-01-01', hoje)).toThrow(
      'Data de nascimento no futuro',
    );
  });

  it('lança erro para formato de data inválido', () => {
    expect(() => calcularIdade('23/10/2000', hoje)).toThrow(
      'Data de nascimento inválida',
    );
  });

  it('lança erro para data inexistente', () => {
    expect(() => calcularIdade('2023-02-30', hoje)).toThrow(
      'Data de nascimento inválida',
    );
  });
});
