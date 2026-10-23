const request = require('supertest');
const { criarApp } = require('../../src/app');

describe('API /pessoas (integração)', () => {
  let app;
  const hoje = new Date('2026-10-23T12:00:00Z');
  const maria = {
    cpf: '529.982.247-25',
    nome: 'Maria Silva',
    dataNascimento: '2000-05-10',
  };

  beforeEach(() => {
    app = criarApp({ agora: () => hoje });
  });

  it('GET /health responde ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('fluxo completo: cria, lista, busca, atualiza e remove', async () => {
    const criada = await request(app).post('/pessoas').send(maria);
    expect(criada.status).toBe(201);
    expect(criada.body).toEqual({ ...maria, idade: 26 });

    const lista = await request(app).get('/pessoas');
    expect(lista.status).toBe(200);
    expect(lista.body).toHaveLength(1);

    const busca = await request(app).get('/pessoas/52998224725');
    expect(busca.status).toBe(200);
    expect(busca.body.nome).toBe('Maria Silva');

    const atualizada = await request(app)
      .put('/pessoas/529.982.247-25')
      .send({ nome: 'Maria Souza', dataNascimento: '1990-12-01' });
    expect(atualizada.status).toBe(200);
    expect(atualizada.body).toMatchObject({ nome: 'Maria Souza', idade: 35 });

    const removida = await request(app).delete('/pessoas/52998224725');
    expect(removida.status).toBe(204);

    const depois = await request(app).get('/pessoas/52998224725');
    expect(depois.status).toBe(404);
  });

  it('POST com CPF inválido retorna 400', async () => {
    const res = await request(app)
      .post('/pessoas')
      .send({ ...maria, cpf: '123.456.789-00' });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ erro: 'CPF inválido' });
  });

  it('POST com data futura retorna 400', async () => {
    const res = await request(app)
      .post('/pessoas')
      .send({ ...maria, dataNascimento: '2030-01-01' });
    expect(res.status).toBe(400);
    expect(res.body.erro).toBe('Data de nascimento no futuro');
  });

  it('POST com CPF duplicado retorna 409', async () => {
    await request(app).post('/pessoas').send(maria);
    const res = await request(app).post('/pessoas').send(maria);
    expect(res.status).toBe(409);
  });

  it('PUT e DELETE de CPF inexistente retornam 404', async () => {
    expect(
      (await request(app).put('/pessoas/11144477735').send({ nome: 'X' })).status,
    ).toBe(404);
    expect((await request(app).delete('/pessoas/11144477735')).status).toBe(404);
  });

  it('JSON malformado retorna 400', async () => {
    const res = await request(app)
      .post('/pessoas')
      .set('Content-Type', 'application/json')
      .send('{"cpf":');
    expect(res.status).toBe(400);
  });
});
