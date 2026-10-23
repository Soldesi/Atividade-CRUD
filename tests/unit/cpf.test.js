const { validarCpf, limparCpf, formatarCpf } = require('../../src/utils/cpf');

describe('limparCpf', () => {
  it('remove pontos e traço', () => {
    expect(limparCpf('529.982.247-25')).toBe('52998224725');
  });
});

describe('validarCpf', () => {
  it.each(['52998224725', '529.982.247-25', '111.444.777-35'])(
    'aceita CPF válido %s',
    (cpf) => {
      expect(validarCpf(cpf)).toBe(true);
    },
  );

  it('rejeita CPF com dígito verificador errado', () => {
    expect(validarCpf('529.982.247-26')).toBe(false);
  });

  it('rejeita CPF com todos os dígitos iguais', () => {
    expect(validarCpf('111.111.111-11')).toBe(false);
  });

  it('rejeita CPF com quantidade errada de dígitos', () => {
    expect(validarCpf('1234567890')).toBe(false);
  });

  it('rejeita valores vazios ou não textuais', () => {
    expect(validarCpf('')).toBe(false);
    expect(validarCpf(null)).toBe(false);
    expect(validarCpf(undefined)).toBe(false);
  });
});

describe('formatarCpf', () => {
  it('formata com pontos e traço', () => {
    expect(formatarCpf('52998224725')).toBe('529.982.247-25');
  });
});
