const Database = require('../models');

const getAll = async (req, res) => {
  try {
    const database = new Database();
    const result = await database.getUserModel().findAll();
    const users = result.map(user => user.dataValues);
    res.send(users);
  } catch (e) {
    res.status(500).json();
  }
};

module.exports = {
  getAll,
};
