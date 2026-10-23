const FORMATO_DATA = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Converte uma string YYYY-MM-DD em { ano, mes, dia }, validando se a data existe.
 */
function parseData(dataTexto) {
  const match = FORMATO_DATA.exec(String(dataTexto));
  if (!match) {
    throw new Error('Data de nascimento inválida');
  }
  const [, ano, mes, dia] = match.map(Number);
  const data = new Date(Date.UTC(ano, mes - 1, dia));
  if (
    data.getUTCFullYear() !== ano ||
    data.getUTCMonth() !== mes - 1 ||
    data.getUTCDate() !== dia
  ) {
    throw new Error('Data de nascimento inválida');
  }
  return { ano, mes, dia };
}

/**
 * Calcula a idade em anos completos.
 * @param {string} dataNascimento no formato YYYY-MM-DD
 * @param {Date} [referencia] data de referência (padrão: agora)
 */
function calcularIdade(dataNascimento, referencia = new Date()) {
  const { ano, mes, dia } = parseData(dataNascimento);
  const anoRef = referencia.getUTCFullYear();
  const mesRef = referencia.getUTCMonth() + 1;
  const diaRef = referencia.getUTCDate();

  let idade = anoRef - ano;
  if (mesRef < mes || (mesRef === mes && diaRef < dia)) {
    idade -= 1;
  }
  if (idade < 0) {
    throw new Error('Data de nascimento no futuro');
  }
  return idade;
}

module.exports = { calcularIdade, parseData };
