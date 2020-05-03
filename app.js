const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const tokenRouter = require('./routes/tokenRouter');
const userRouter = require('./routes/userRouter');
const authenticate = require('./middlewares/authMiddleware');
const sequelize = require('./models');

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', authenticate, userRouter);
app.use('/token', authenticate, tokenRouter);
app.use((req, res) => {
  res.status(404).send('Not Found');
});

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));
