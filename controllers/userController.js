const Database = require('../models');

class UserController {
  constructor() {
    this.database = new Database();
  }

  getAll() {
    return async (req, res) => {
      try {
        const result = await this.database.getUserModel().findAll();
        const users = result.map(user => user.dataValues);
        res.send(users);
      } catch (e) {
        res.status(500).json();
      }
    };
  }
}

module.exports = UserController;
