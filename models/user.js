const Sequelize = require('sequelize');
const sequelize = require('./index');

const user = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  accountAddress: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = user;
