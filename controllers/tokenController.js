exports.createToken = (req, res) => {
  if (!req.body) {
    res.sendStatus(400);
  }
  console.log(req.body);
  res.send('hoba');
};
