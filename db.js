const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('estudiambre', 'Arath', 'Balam', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
