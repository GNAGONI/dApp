const { body, query } = require('express-validator');

const getMethod = (location, fieldName) => {
  let method = () => {};
  switch (location) {
    case 'query':
      method = query(fieldName);
      break;
    default:
      method = body(fieldName);
      break;
  }
  return method;
};

const validateEthereumAddress = (location, fieldName, messageName) => {
  const method = getMethod(location, fieldName);
  return method
    .isString()
    .withMessage(`${messageName} should be a string`)
    .matches(/^0x[a-fA-F0-9]{40}$/)
    .withMessage(`${messageName} should be an ethereum address`)
    .exists()
    .withMessage(`${messageName} doesn't exist`);
};

const validateAccountMnemonics = (location, fieldName, messageName) => {
  const method = getMethod(location, fieldName);
  return method
    .isString()
    .withMessage(`${messageName} should be a string`)
    .isLength({ min: '10' })
    .withMessage(`${messageName}  length should be more than 10 symbols`)
    .exists()
    .withMessage(`${messageName}  does not exist`);
};

const validate = method => {
  switch (method) {
    case 'createToken': {
      return [
        validateEthereumAddress('body', 'accountAddress', 'Account address'),
        validateAccountMnemonics(
          'body',
          'accountMnemonics',
          'Account mnemonics',
        ),
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
        body('tokenAmount')
          .isInt()
          .exists()
          .withMessage('Token amount does not exist'),
        body('projectId')
          .isInt()
          .exists()
          .withMessage('Project id does not exist'),
      ];
    }
    case 'getData': {
      return [
        validateEthereumAddress('query', 'tokenAddress', 'Token address'),
      ];
    }
    case 'getBalance': {
      return [
        validateEthereumAddress('query', 'tokenAddress', 'Token address'),
        validateEthereumAddress('query', 'accountAddress', 'Account address'),
      ];
    }
    case 'sendTokens': {
      return [
        validateEthereumAddress('body', 'tokenAddress', 'Token address'),
        validateEthereumAddress(
          'body',
          'senderAccountAddress',
          'Account address of sender',
        ),
        validateEthereumAddress(
          'body',
          'receiverAccountAddress',
          'Account address of receiver',
        ),
        body('tokenAmount')
          .isString()
          .exists()
          .withMessage('Token amount does not exist'),
        validateAccountMnemonics(
          'body',
          'accountMnemonics',
          'Account mnemonics',
        ),
      ];
    }
    default: {
      return [];
    }
  }
};

module.exports = { validate };
