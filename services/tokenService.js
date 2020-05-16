const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
const solc = require('solc');
const ProviderService = require('./providerService');

dotenv.config();

const compile = (contractSrc, contractClassName) => {
  const sourcePath = path.resolve(__dirname, '../contracts', contractSrc);
  const source = fs.readFileSync(sourcePath, 'utf8');
  const {
    interface: contractInterface,
    bytecode: contractBytecode,
  } = solc.compile(source, 1).contracts[`:${contractClassName}`];
  return {
    contractInterface,
    contractBytecode,
  };
};

const deployToken = async (
  tokenAmount,
  tokenName,
  tokenSymbol,
  accountAddress,
  accountMnemonics,
) => {
  const providerService = new ProviderService(accountMnemonics);
  const web3 = providerService.getWeb3();
  const account = await providerService.getAccountByAddress(accountAddress);

  console.log('Deploying to the Network using account : ', account);
  const { contractInterface, contractBytecode } = compile('token.sol', 'Token');
  const result = await new web3.eth.Contract(JSON.parse(contractInterface))
    .deploy({
      data: `0x${contractBytecode}`,
      arguments: [tokenAmount, tokenName, tokenSymbol],
    })
    .send({ gas: '3000000', from: account, value: '0' })
    .catch(e => {
      throw e;
    });
  fs.appendFileSync(
    'deployedContracts.txt',
    `${result.options.address}\n${contractInterface}\n\n`,
    e => {
      if (e) {
        throw e;
      }
    },
  );
  return result.options.address;
};

const getTokenData = async contractAddress => {
  const providerService = new ProviderService(process.env.METAMASK_MNEMONICS);
  const web3 = providerService.getWeb3();
  const { contractInterface } = compile('token.sol', 'Token');
  const contract = await new web3.eth.Contract(
    JSON.parse(contractInterface),
    contractAddress,
  );
  const tokenName = await contract.methods.name().call();
  const tokenSymbol = await contract.methods.symbol().call();
  const tokenAmount = await contract.methods.totalSupply().call();
  const tokenDecimals = await contract.methods.decimals().call();
  return {
    tokenName,
    tokenSymbol,
    tokenAmount,
    tokenDecimals,
  };
};

const getBalance = async (contractAddress, accountAddress) => {
  const providerService = new ProviderService(process.env.METAMASK_MNEMONICS);
  const web3 = providerService.getWeb3();
  const { contractInterface } = compile('token.sol', 'Token');
  const contract = await new web3.eth.Contract(
    JSON.parse(contractInterface),
    contractAddress,
  );
  const balance = await contract.methods.balanceOf(accountAddress).call();
  return balance;
};

const transferTokensFrom = async (
  contractAddress,
  senderAccountAddress,
  receiverAccountAddress,
  tokenAmount,
  accountMnemonics,
) => {
  const providerService = new ProviderService(accountMnemonics);
  const web3 = providerService.getWeb3();
  const account = await providerService.getAccountByAddress(
    senderAccountAddress,
  );
  const { contractInterface } = compile('token.sol', 'Token');
  const contract = await new web3.eth.Contract(
    JSON.parse(contractInterface),
    contractAddress,
  );

  const { transactionHash } = await contract.methods
    .transfer(receiverAccountAddress, tokenAmount)
    .send({ from: account, gas: '3000000' });

  return transactionHash;
};

module.exports = {
  compile,
  deployToken,
  getTokenData,
  getBalance,
  transferTokensFrom,
};
