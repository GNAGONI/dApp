class TokenModel {
  constructor(sequelize, Sequelize) {
    this.modelName = 'project_owners_wallet';
    const Tokens = sequelize.define(
      this.modelName,
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
        token_amount: {
          type: Sequelize.STRING(32),
          allowNull: false,
        },
        token_name: {
          type: Sequelize.STRING(32),
          allowNull: false,
        },
        token_symbol: {
          type: Sequelize.STRING(32),
          allowNull: false,
        },
        token_decimals: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        timestamps: false,
        underscored: true,
        tableName: this.modelName,
      },
    );
    this.tokens = Tokens;
  }

  getTokenModel() {
    return this.tokens;
  }
}

module.exports = TokenModel;
