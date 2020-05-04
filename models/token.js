module.exports = (sequelize, Sequelize) => {
  const Tokens = sequelize.define('tokens', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tokenAddress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Tokens;
};
