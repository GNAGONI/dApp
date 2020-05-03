const userModel = require('../models/user');

const getAll = async (req, res) => {
  try {
    const result = await userModel.findAll();
    const users = result.map(user => user.dataValues);
    res.send(users);
  } catch (e) {
    res.status(500).json();
  }
};

module.exports = {
  getAll,
};
