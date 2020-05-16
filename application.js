const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const Router = require('./routes');
const Middlewares = require('./middlewares');
const Database = require('./models');

dotenv.config();

class Application {
  constructor() {
    this.app = express();
    this.router = new Router();
    this.db = new Database();
    this.middlewares = new Middlewares();

    this.tokenRouter = this.router.getTokenRouter();
    this.userRouter = this.router.getUserRouter();
    this.authMiddleware = this.middlewares.getAuthMiddleware();

    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(
      '/user',
      this.authMiddleware.authenticate(),
      this.userRouter.getUserRouter(),
    );
    this.app.use(
      '/token',
      this.authMiddleware.authenticate(),
      this.tokenRouter.getTokenRouter(),
    );
    this.app.use((req, res) => {
      res.status(404).send('Not Found');
    });
  }

  run() {
    this.db.sync(() => {
      this.app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
      });
    });
  }
}

module.exports = Application;
