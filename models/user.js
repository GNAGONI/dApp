module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    'users',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      account_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'users',
    },
  );

  return Users;
};
