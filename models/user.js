class UserModel {
  constructor(sequelize, Sequelize) {
    this.modelName = 'users';
    const Users = sequelize.define(
      this.modelName,
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
        tableName: this.modelName,
      },
    );
    this.users = Users;
  }

  getUserModel() {
    return this.users;
  }
}

module.exports = UserModel;
