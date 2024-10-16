const { Sequelize } = require('sequelize');

// Conexão com o banco de dados MySQL
const sequelize = new Sequelize('infoconectadosfinal', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o MySQL estabelecida com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MySQL:', error);
  });

module.exports = sequelize;
