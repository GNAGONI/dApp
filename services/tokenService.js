const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
const solc = require('solc');
const ProviderService = require('./providerService');

dotenv.config();

class TokenService {
  constructor() {
    this.contractInterface = null;
    this.contractBytecode = null;
  }

  getContractInterface() {
    return this.contractInterface;
  }

  getContractBytecode() {
    return this.contractBytecode;
  }

  compile(contractSrc, contractClassName) {
    const sourcePath = path.resolve(__dirname, '../contracts', contractSrc);
    const source = fs.readFileSync(sourcePath, 'utf8');
    const {
      interface: contractInterface,
      bytecode: contractBytecode,
    } = solc.compile(source, 1).contracts[`:${contractClassName}`];
    this.contractInterface = contractInterface;
    this.contractBytecode = contractBytecode;
  }

  async deployToken(
    tokenAmount,
    tokenName,
    tokenSymbol,
    accountAddress,
    accountMnemonics,
  ) {
    const providerService = new ProviderService(accountMnemonics);
    const web3 = providerService.getWeb3();
    const account = await providerService.getAccountByAddress(accountAddress);

    console.log('Deploying to the Network using account : ', account);
    this.compile('token.sol', 'Token');
    const result = await new web3.eth.Contract(
      JSON.parse(this.contractInterface),
    )
      .deploy({
        data: `0x${this.contractBytecode}`,
        arguments: [tokenAmount, tokenName, tokenSymbol],
      })
      .send({ gas: '3000000', from: account, value: '0' })
      .catch(e => {
        throw e;
      });
    fs.appendFileSync(
      'deployedContracts.txt',
      `${result.options.address}\n${this.contractInterface}\n\n`,
      e => {
        if (e) {
          throw e;
        }
      },
    );
    return result.options.address;
  }

  async getTokenData(contractAddress) {
    const providerService = new ProviderService(process.env.METAMASK_MNEMONICS);
    const web3 = providerService.getWeb3();
    this.compile('token.sol', 'Token');
    const contract = await new web3.eth.Contract(
      JSON.parse(this.contractInterface),
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
  }

  async getBalance(contractAddress, accountAddress) {
    const providerService = new ProviderService(process.env.METAMASK_MNEMONICS);
    const web3 = providerService.getWeb3();
    this.compile('token.sol', 'Token');
    const contract = await new web3.eth.Contract(
      JSON.parse(this.contractInterface),
      contractAddress,
    );
    const balance = await contract.methods.balanceOf(accountAddress).call();
    return balance;
  }

  async transferTokensFrom(
    contractAddress,
    senderAccountAddress,
    receiverAccountAddress,
    tokenAmount,
    accountMnemonics,
  ) {
    const providerService = new ProviderService(accountMnemonics);
    const web3 = providerService.getWeb3();
    const account = await providerService.getAccountByAddress(
      senderAccountAddress,
    );
    this.compile('token.sol', 'Token');
    const contract = await new web3.eth.Contract(
      JSON.parse(this.contractInterface),
      contractAddress,
    );

    const { transactionHash } = await contract.methods
      .transfer(receiverAccountAddress, tokenAmount)
      .send({ from: account, gas: '3000000' });

    return transactionHash;
  }
}

module.exports = TokenService;
