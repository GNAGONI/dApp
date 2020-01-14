const path = require('path');
const fs = require('fs');
const solc = require('solc');

const sourcePath = path.resolve(__dirname, 'contracts', 'multiauth.sol');

const source = fs.readFileSync(sourcePath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':MultiAuth'];

// TODO: Move contract to new version and compile it according to new versions
// const input = {
//   language: 'Solidity',
//   sources: {
//     'multiauth.sol': {
//       content: source,
//     },
//   },
//   settings: {
//     outputSelection: {
//       '*': {
//         '*': ['*'],
//       },
//     },
//   },
// };

// console.log(JSON.parse(solc.compile(JSON.stringify(input))));
