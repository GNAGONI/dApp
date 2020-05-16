const { validationResult } = require('express-validator');
const db = require('../models');
const tokenService = require('../services/tokenService');

const getAll = async (req, res) => {
  try {
    const result = await db.token.findAll({
      include: [db.user, db.project],
    });
    const tokens = result.map(token => ({
      id: token.dataValues.id,
      tokenAddress: token.dataValues.token_address,
      tokenAmount: token.dataValues.token_amount,
      tokenName: token.dataValues.token_name,
      tokenSymbol: token.dataValues.token_symbol,
      tokenDecimals: token.dataValues.token_decimals,
      user: token.dataValues.user,
      project: token.dataValues.project,
    }));
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
        projectId,
      } = req.body;
      const { userId } = req.user;
      const tokenAddress = await tokenService.deployToken(
        tokenAmount,
        tokenName,
        tokenSymbol,
        accountAddress,
        accountMnemonics,
      );

      await db.token.create({
        token_address: tokenAddress,
        user_id: userId,
        project_id: projectId,
        token_amount: Number(tokenAmount) * 10 ** 18,
        token_name: tokenName,
        token_symbol: tokenSymbol,
        token_decimals: 18,
      });
      const tokenData = await tokenService.getTokenData(tokenAddress);

      res.send({ ...tokenData, tokenAddress });
    }
  } catch (e) {
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

const getDataByProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      const { projectId } = req.query;
      const result = await db.token.findAll({
        where: {
          project_id: projectId,
        },
      });
      if (result.length) {
        const { token_address: tokenAddress } = result[0];
        const tokenData = await tokenService.getTokenData(tokenAddress);
        res.send({ ...tokenData, tokenAddress });
      } else {
        res.sendStatus(404).json();
      }
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
  getDataByProject,
};
