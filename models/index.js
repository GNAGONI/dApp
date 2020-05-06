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
  },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize, Sequelize);
db.token = require('./token')(sequelize, Sequelize);

db.user.hasMany(db.token, {
  foreignKey: 'userId',
  sourceKey: 'id',
});
db.token.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id',
});

module.exports = db;
