import web3 from './web3';
// this is to import the compiled code
import Ais from './build/Ais.json';

// to create the instace, we need to call factory.js with ABI and deploeyed address
const instance = new web3.eth.Contract(
  JSON.parse(Ais.interface),
    '0xF2e51b1c2730AeB9306aC49de11302C9B585A9fa'
//      '0x40e0A57C270DE997942B2E86a27EfE420Be2b2eB'
);

export default instance;
