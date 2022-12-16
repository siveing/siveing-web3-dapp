import { ethers } from 'ethers';
import contract20 from './../Contracts/ERC-20.json';
import contract721 from './../Contracts/ERC-721.json';

// Custom block explorer
const blockExplorer = "https://testnet.iotexscan.io/tx/"

const abiContractErc721 = contract721.abi;
const contractAddressErc721 = contract721.addressContract;
const abiContractErc20 = contract20.abi;
const contractAddressErc20 = contract20.addressContract;

const someTestnetChainIds = [
    4690, // iotex testnet
    80001, // polygon testnet
];

const { ethereum } = window;

if(!ethereum){
    alert('Please install Metamask to continue.');
}

const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const tokenContract = new ethers.Contract(contractAddressErc20, abiContractErc20, signer);
const nftContract = new ethers.Contract(contractAddressErc721, abiContractErc721, signer);

export {
    someTestnetChainIds,
    provider,
    blockExplorer,
    abiContractErc721,
    contractAddressErc721,
    abiContractErc20,
    contractAddressErc20,
    tokenContract,
    nftContract
}