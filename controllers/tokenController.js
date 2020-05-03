const { body, validationResult } = require('express-validator');

const createToken = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      res.status(200).json();
    }
  } catch (e) {
    res.status(500).json();
  }
};

const validate = method => {
  switch (method) {
    case 'createToken': {
      return [
        body('accountAddress')
          .isString()
          .withMessage('Account address should be a string')
          .matches(/^0x[a-fA-F0-9]{40}$/)
          .withMessage('Account address should be an ethereum address')

          .exists()
          .withMessage('Account address does not exist'),
        body('accountMnemonics')
          .isString()
          .withMessage('Account mnemonics should be a string')
          .isLength({ min: '10' })
          .withMessage(
            'Account mnemonics length should be more than 10 symbols',
          )
          .exists()
          .withMessage('Account mnemonics does not exist'),
        body('tokenName')
          .isString()
          .withMessage('Token name should be a string')
          .exists()
          .withMessage('Token name does not exist'),
        body('tokenSymbol')
          .isString()
          .withMessage('Token symbol should be a string')
          .exists()
          .withMessage('Token symbol does not exist'),
        body('tokenAmmount')
          .isInt()
          .exists(),
      ];
    }
    default: {
      return [];
    }
  }
};

module.exports = {
  createToken,
  validate,
};
