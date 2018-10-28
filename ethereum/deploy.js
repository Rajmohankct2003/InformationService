const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledAis = require('./build/Ais.json');

const provider = new HDWalletProvider(
  'lend nest blouse size virus wrap slab hold job interest lucky adjust',
  'https://rinkeby.infura.io/v3/b43c232a4be141089d9771806f6626d2'
);
const web3 = new Web3(provider);

const deploy = async () => {

  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  // Use one of those accounts to deploy the contract
  const result = await new web3.eth.Contract(JSON.parse(compiledAis.interface))
    .deploy({ data: '0x' + compiledAis.bytecode })
    .send({ from: accounts[0],
           gas: '3000000' });

  // ADD THIS ONE LINE RIGHT HERE!!!!! <---------------------
  result.setProvider(provider);

  console.log('Contract deployed to', result.options.address);

};

deploy();
