const path = require('path');
const fs = require('fs');
const solc = require('solc');

const compile = (contractSrc, contractClassName) => {
  const sourcePath = path.resolve(__dirname, 'contracts', contractSrc);
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

module.exports = { compile };
