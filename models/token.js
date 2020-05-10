module.exports = (sequelize, Sequelize) => {
  const Tokens = sequelize.define(
    'project_owners_wallet',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      token_address: {
        type: Sequelize.STRING(42),
        allowNull: false,
      },
      project_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'project_owners_wallet',
    },
  );
  return Tokens;
};
