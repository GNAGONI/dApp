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
      username: {
        type: Sequelize.STRING(45),
        allowNull: false,
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
