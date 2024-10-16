const sequelize = require('../config/database');
const Cliente = require('./cliente');
const Prestador = require('./prestador');
const User = require('./user');

// Sincronizar os modelos com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar modelos:', error);
  });

module.exports = { Cliente, Prestador, User };
