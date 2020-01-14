const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

beforeEach(async () => {
  // Get list of all accounts
  web3.eth.getAccounts().then(fetchedAccounts => {
    console.log(fetchedAccounts);
  });
});

describe('MultiAuth', () => {
  it('contract deployment', () => {});
});
