module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('users', {
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

  return Users;
};
