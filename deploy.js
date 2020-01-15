const Web3 = require('web3');
const dotenv = require('dotenv');
const HDWalletProvider = require('truffle-hdwallet-provider');
const { interface: contractInterface, bytecode } = require('./compile');

dotenv.config();
const provider = new HDWalletProvider(
  process.env.METAMASK_MNEMONICS,
  process.env.INFURA_ENDPOINT,
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Deploying to the Network using account : ', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(contractInterface))
    .deploy({
      data: `0x${bytecode}`,
      arguments: [
        [
          '0x61Ee7fA43ff49d4E9CC680E6031F074bd4BF85c7',
          '0xBdAb9d885443A1D381EF4c03600d80FED63ABf46',
        ],
        '0x9De226640854E3b2408cDFD486663bEaC3C072EC',
      ],
    })
    .send({ gas: '1000000', from: accounts[0], value: '2000000' });
  console.log('Contract Deployed to : ', result.options.address);
};

deploy();