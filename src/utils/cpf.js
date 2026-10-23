function limparCpf(cpf) {
  return String(cpf ?? '').replace(/\D/g, '');
}

function calcularDigito(base) {
  const pesoInicial = base.length + 1;
  const soma = base
    .split('')
    .reduce((acc, digito, i) => acc + Number(digito) * (pesoInicial - i), 0);
  const resto = (soma * 10) % 11;
  return resto === 10 ? 0 : resto;
}

function validarCpf(cpf) {
  if (typeof cpf !== 'string') {
    return false;
  }
  const numeros = limparCpf(cpf);
  if (numeros.length !== 11 || /^(\d)\1{10}$/.test(numeros)) {
    return false;
  }
  const digito1 = calcularDigito(numeros.slice(0, 9));
  const digito2 = calcularDigito(numeros.slice(0, 10));
  return digito1 === Number(numeros[9]) && digito2 === Number(numeros[10]);
}

function formatarCpf(cpf) {
  return limparCpf(cpf).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

module.exports = { limparCpf, validarCpf, formatarCpf };
