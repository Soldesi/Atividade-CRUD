const { criarApp } = require('./app');

const PORTA = process.env.PORT || 3000;

criarApp().listen(PORTA, () => {
  console.log(`API rodando em http://localhost:${PORTA}`);
});
