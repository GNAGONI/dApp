const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

class ProviderService {
  constructor(accountMnemonics) {
    const provider = new HDWalletProvider(
      accountMnemonics,
      process.env.INFURA_ENDPOINT,
    );
    this.provider = provider;
    if (this.provider === null) {
      throw new Error('Provider is not set');
    }
    const web3 = new Web3(this.provider);
    this.web3 = web3;
  }

  getWeb3() {
    if (this.web3 === null) {
      throw new Error('Web3 is not set');
    }
    return this.web3;
  }

  async getAccountByAddress(accountAddress) {
    if (this.web3 === null) {
      throw new Error('Web3 is not set');
    }
    const accounts = await this.web3.eth.getAccounts();
    const accountIndex = accounts.indexOf(accountAddress);
    if (accountIndex < 0) {
      throw new Error('Cannot get an account list');
    }
    return accounts[accountIndex];
  }
}

module.exports = ProviderService;
