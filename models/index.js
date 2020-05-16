const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize, Sequelize);
db.token = require('./token')(sequelize, Sequelize);
db.project = require('./project')(sequelize, Sequelize);

db.user.hasMany(db.token, {
  foreignKey: 'user_id',
  sourceKey: 'id',
});
db.token.belongsTo(db.user, {
  foreignKey: 'user_id',
  targetKey: 'id',
});

db.project.hasOne(db.token, {
  foreignKey: 'project_id',
  sourceKey: 'id',
});
db.token.belongsTo(db.project, {
  foreignKey: 'project_id',
  targetKey: 'id',
});

module.exports = db;
