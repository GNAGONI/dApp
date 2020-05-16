const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const TokenRouter = require('./routes/tokenRouter');
const UserRouter = require('./routes/userRouter');
const Middlewares = require('./middlewares');
const Database = require('./models');

dotenv.config();
const app = express();
const tokenRouter = new TokenRouter();
const userRouter = new UserRouter();
const db = new Database();
const middlewares = new Middlewares();
const authMiddleware = middlewares.getAuthMiddleware();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', authMiddleware.authenticate(), userRouter.getUserRouter());
app.use('/token', authMiddleware.authenticate(), tokenRouter.getTokenRouter());
app.use((req, res) => {
  res.status(404).send('Not Found');
});

db.sync(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
