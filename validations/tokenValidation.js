const { body, query } = require('express-validator');

class Validator {
  constructor() {
    this.method = () => {};
    this.body = body;
    this.query = query;
  }

  setMethod(location, fieldName) {
    switch (location) {
      case 'query':
        this.method = this.query(fieldName);
        break;
      default:
        this.method = this.body(fieldName);
        break;
    }
  }

  validateEthereumAddressField(location, fieldName, messageName) {
    this.setMethod(location, fieldName);
    return this.method
      .isString()
      .withMessage(`${messageName} should be a string`)
      .matches(/^0x[a-fA-F0-9]{40}$/)
      .withMessage(`${messageName} should be an ethereum address`)
      .exists()
      .withMessage(`${messageName} doesn't exist`);
  }

  validateAccountMnemonicsField(location, fieldName, messageName) {
    this.setMethod(location, fieldName);
    return this.method
      .isString()
      .withMessage(`${messageName} should be a string`)
      .isLength({ min: '10' })
      .withMessage(`${messageName}  length should be more than 10 symbols`)
      .exists()
      .withMessage(`${messageName}  does not exist`);
  }

  validateCreateToken() {
    return [
      this.validateEthereumAddressField(
        'body',
        'accountAddress',
        'Account address',
      ),
      this.validateAccountMnemonicsField(
        'body',
        'accountMnemonics',
        'Account mnemonics',
      ),
      this.body('tokenName')
        .isString()
        .withMessage('Token name should be a string')
        .exists()
        .withMessage('Token name does not exist'),
      this.body('tokenSymbol')
        .isString()
        .withMessage('Token symbol should be a string')
        .exists()
        .withMessage('Token symbol does not exist'),
      this.body('tokenAmount')
        .isInt()
        .exists()
        .withMessage('Token amount does not exist'),
      this.body('projectId')
        .isInt()
        .exists()
        .withMessage('Project id does not exist'),
    ];
  }

  validateGetData() {
    return [
      this.validateEthereumAddressField(
        'query',
        'tokenAddress',
        'Token address',
      ),
    ];
  }

  validateGetBalance() {
    return [
      this.validateEthereumAddressField(
        'query',
        'tokenAddress',
        'Token address',
      ),
      this.validateEthereumAddressField(
        'query',
        'accountAddress',
        'Account address',
      ),
    ];
  }

  validateSendTokens() {
    return [
      this.validateEthereumAddressField(
        'body',
        'tokenAddress',
        'Token address',
      ),
      this.validateEthereumAddressField(
        'body',
        'senderAccountAddress',
        'Account address of sender',
      ),
      this.validateEthereumAddressField(
        'body',
        'receiverAccountAddress',
        'Account address of receiver',
      ),
      this.body('tokenAmount')
        .isString()
        .exists()
        .withMessage('Token amount does not exist'),
      this.validateAccountMnemonicsField(
        'body',
        'accountMnemonics',
        'Account mnemonics',
      ),
    ];
  }

  validateGetDataByProject() {
    return [
      this.query('projectId')
        .isInt()
        .exists(),
    ];
  }

  validate(method) {
    switch (method) {
      case 'createToken': {
        return this.validateCreateToken();
      }
      case 'getData': {
        return this.validateGetData();
      }
      case 'getBalance': {
        return this.validateGetBalance();
      }
      case 'sendTokens': {
        return this.validateSendTokens();
      }
      case 'getDataByProject': {
        return this.validateGetDataByProject();
      }
      default: {
        return [];
      }
    }
  }
}

module.exports = Validator;
