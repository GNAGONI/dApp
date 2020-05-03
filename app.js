const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const tokenRouter = require('./routes/tokenRouter');
const authenticate = require('./middlewares/authMiddleware');

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/token', authenticate, tokenRouter);
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
