const assert = require('assert');
const events = require('events');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface: contractInterface, bytecode } = require('../compile');

events.EventEmitter.prototype._maxListeners = 17;
const provider = ganache.provider();
const web3 = new Web3(provider);

let auth;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  auth = await new web3.eth.Contract(JSON.parse(contractInterface))
    .deploy({
      data: bytecode,
      arguments: [[accounts[1], accounts[2]], accounts[3]],
    })
    .send({ from: accounts[0], gas: '1000000', value: '20000000000000000000' });
});

describe('MultiAuth', () => {
  it('Testing Receiver  ', async () => {
    assert.equal(await auth.methods.receiver().call(), accounts[3]);
  });

  it('Testing The Contract balance  ', async () => {
    const bal = await auth.methods.getContractBalance().call();
    assert.equal(bal, '20000000000000000000');
  });

  it('Testing The Approval ', async () => {
    await auth.methods.approve().send({ from: accounts[1] });
    await auth.methods.approve().send({ from: accounts[2] });
  });

  it('Testing The Receivers balance ', async () => {
    const accBal = await web3.eth.getBalance(accounts[3]);
    assert.ok(accBal >= 120000000000000000000);
  });
});
