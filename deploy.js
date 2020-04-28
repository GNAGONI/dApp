const fs = require('fs');
const Web3 = require('web3');
const dotenv = require('dotenv');
const HDWalletProvider = require('truffle-hdwallet-provider');
const { compile } = require('./compile');

dotenv.config();

const provider = new HDWalletProvider(
  process.env.METAMASK_MNEMONICS,
  process.env.INFURA_ENDPOINT,
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  if (!Array.isArray(accounts) || !accounts.length) {
    throw new Error('Cannot get an account list');
  }
  console.log('Deploying to the Network using account : ', accounts[0]);
  const { contractInterface, contractBytecode } = compile('token.sol', 'Token');
  const result = await new web3.eth.Contract(JSON.parse(contractInterface))
    .deploy({
      data: `0x${contractBytecode}`,
      arguments: [100, 'TestToken6', 'TT6'],
    })
    .send({ gas: '1000000', from: accounts[0], value: '0' })
    .catch(e => {
      throw e;
    });
  fs.appendFileSync(
    'deployedContracts.txt',
    `${result.options.address}\n${contractInterface}\n\n`,
    error => {
      if (error) {
        throw error;
      }
    },
  );
  process.exit();
};

try {
  deploy();
} catch (e) {
  console.error(e);
}
