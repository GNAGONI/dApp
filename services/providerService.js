const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const getProvider = accountMnemonics => {
  const provider = new HDWalletProvider(
    accountMnemonics,
    process.env.INFURA_ENDPOINT,
  );
  return provider;
};

const getWeb3 = accountMnemonics => {
  const provider = getProvider(accountMnemonics);
  const web3 = new Web3(provider);
  return web3;
};

const getAccountByAddress = async (web3, accountAddress) => {
  const accounts = await web3.eth.getAccounts();
  const accountIndex = accounts.indexOf(accountAddress);
  if (accountIndex < 0) {
    throw new Error('Cannot get an account list');
  }
  return accounts[accountIndex];
};

module.exports = { getWeb3, getAccountByAddress };
