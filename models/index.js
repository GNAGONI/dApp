const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const UserModel = require('./user');
const TokenModel = require('./token');
const ProjectModel = require('./project');

dotenv.config();

class Database {
  constructor() {
    this.sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
      },
    );
    this.db = {};
    this.db.Sequelize = Sequelize;
    this.db.sequelize = this.sequelize;

    const projectModel = new ProjectModel(this.sequelize, Sequelize);
    this.db.project = projectModel.getProjectModel();

    const token = new TokenModel(this.sequelize, Sequelize);
    this.db.token = token.getTokenModel();

    const userModel = new UserModel(this.sequelize, Sequelize);
    this.db.user = userModel.getUserModel();

    this.db.user.hasMany(this.db.token, {
      foreignKey: 'user_id',
      sourceKey: 'id',
    });
    this.db.token.belongsTo(this.db.user, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });

    this.db.project.hasOne(this.db.token, {
      foreignKey: 'project_id',
      sourceKey: 'id',
    });
    this.db.token.belongsTo(this.db.project, {
      foreignKey: 'project_id',
      targetKey: 'id',
    });
  }

  getTokenModel() {
    return this.db.token;
  }

  getUserModel() {
    return this.db.user;
  }

  getProjectModel() {
    return this.db.project;
  }

  sync(server) {
    this.db.sequelize
      .sync()
      .then(() => {
        server();
      })
      .catch(err => console.error(err));
  }
}

module.exports = Database;
