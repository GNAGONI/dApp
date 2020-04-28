const assert = require('assert');
const events = require('events');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { compile } = require('../compile');

events.EventEmitter.prototype._maxListeners = 1000;
const provider = ganache.provider();
const web3 = new Web3(provider);

let auth;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  const { contractInterface, contractBytecode } = compile('token.sol', 'Token');
  auth = await new web3.eth.Contract(JSON.parse(contractInterface))
    .deploy({
      data: contractBytecode,
      arguments: [100, 'TestToken', 'TTN'],
    })
    .send({ gas: '1000000', from: accounts[0], value: '0' });

  await auth.methods
    .approve(accounts[2], 10)
    .send({ gas: '1000000', from: accounts[0], value: '0' });
});

describe('Token', () => {
  it('Testing name', async () => {
    assert.equal(await auth.methods.name().call(), 'TestToken');
  });

  it('Testing symbol', async () => {
    assert.equal(await auth.methods.symbol().call(), 'TTN');
  });

  it('Testing total supply', async () => {
    assert.equal(
      await auth.methods.totalSupply().call(),
      '100000000000000000000',
    );
  });

  it('Testing decimals', async () => {
    assert.equal(await auth.methods.decimals().call(), 18);
  });

  it('Testing publisher balance', async () => {
    assert.equal(
      await auth.methods.balanceOf(accounts[0]).call(),
      '100000000000000000000',
    );
  });

  it('Testing allowance unapproved', async () => {
    assert.equal(
      await auth.methods.allowance(accounts[0], accounts[1]).call(),
      0,
    );
  });

  it('Testing allowance approved ', async () => {
    assert.equal(
      await auth.methods.allowance(accounts[0], accounts[2]).call(),
      10,
    );
  });

  it('Testing burn', async () => {
    assert.equal(
      await auth.methods.balanceOf(accounts[0]).call(),
      '100000000000000000000',
    );
    await auth.methods
      .burn(100)
      .send({ gas: '1000000', from: accounts[0], value: '0' });
    assert.equal(
      await auth.methods.balanceOf(accounts[0]).call(),
      '99999999999999999900',
    );
  });

  it('Testing burn from', async () => {
    await auth.methods
      .burnFrom(accounts[0], 5)
      .send({ gas: '1000000', from: accounts[2], value: '0' });
    assert.equal(
      await auth.methods.balanceOf(accounts[0]).call(),
      '99999999999999999995',
    );
  });

  it('Testing transfer', async () => {
    await auth.methods
      .transfer(accounts[2], 100)
      .send({ gas: '1000000', from: accounts[0], value: '0' });
    assert.equal(await auth.methods.balanceOf(accounts[2]).call(), 100);
    assert.equal(
      await auth.methods.balanceOf(accounts[0]).call(),
      '99999999999999999900',
    );
  });

  it('Testing transfer from', async () => {
    await auth.methods
      .transferFrom(accounts[0], accounts[2], 10)
      .send({ gas: '1000000', from: accounts[2], value: '0' });
    assert.equal(await auth.methods.balanceOf(accounts[2]).call(), 10);
    assert.equal(
      await auth.methods.balanceOf(accounts[0]).call(),
      '99999999999999999990',
    );
  });
});
