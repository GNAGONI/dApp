const db = require('../models');

const getAll = async (req, res) => {
  try {
    const result = await db.user.findAll();
    const users = result.map(user => user.dataValues);
    res.send(users);
  } catch (e) {
    res.status(500).json();
  }
};

module.exports = {
  getAll,
};
