const { validationResult } = require('express-validator');
const db = require('../models');
const tokenService = require('../services/tokenService');

const getAll = async (req, res) => {
  try {
    const { id } = req.user;
    const result = await db.token.findAll({
      where: {
        userId: id,
      },
      include: [db.user],
    });
    const tokens = result.map(token => token.dataValues);
    res.send(tokens);
  } catch (e) {
    res.status(500).json();
  }
};

const createToken = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      const {
        tokenName,
        tokenSymbol,
        tokenAmount,
        accountAddress,
        accountMnemonics,
      } = req.body;
      const { id } = req.user;
      const tokenAddress = await tokenService.deployToken(
        tokenAmount,
        tokenName,
        tokenSymbol,
        accountAddress,
        accountMnemonics,
      );
      const result = await db.token.create({
        tokenAddress,
        userId: id,
      });
      res.send(result);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json();
  }
};

const getData = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      const { tokenAddress } = req.query;
      const tokenData = await tokenService.getTokenData(tokenAddress);
      res.send(tokenData);
    }
  } catch (e) {
    res.status(500).json();
  }
};

const getBalance = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      const { tokenAddress, accountAddress } = req.query;
      const balance = await tokenService.getBalance(
        tokenAddress,
        accountAddress,
      );
      res.send({ balance });
    }
  } catch (e) {
    res.status(500).json();
  }
};

const sendTokens = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      const {
        tokenAddress,
        senderAccountAddress,
        receiverAccountAddress,
        tokenAmount,
        accountMnemonics,
      } = req.body;
      const transactionHash = await tokenService.transferTokensFrom(
        tokenAddress,
        senderAccountAddress,
        receiverAccountAddress,
        tokenAmount,
        accountMnemonics,
      );
      res.send({ transactionHash });
    }
  } catch (e) {
    res.status(500).json();
  }
};

module.exports = {
  createToken,
  getAll,
  getData,
  getBalance,
  sendTokens,
};
