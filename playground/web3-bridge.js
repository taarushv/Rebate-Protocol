var Web3 = require('web3');
var web3 = new Web3("https://ropsten.infura.io/v3/e6780ebea2fe4b1b8dde4c72fa0c78a8");

// ropsten network
const address = "0xF85dE686325FA500095c100Fc5A59cd36dBAd7f4"
const abi = [{"constant": false,"inputs": [{"name": "_index","type": "uint256"},{"name": "_ipfsHash","type": "string"}],"name": "addData","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "previousOwner","type": "address"},{"indexed": true,"name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"constant": false,"inputs": [{"name": "_index","type": "uint256"}],"name": "removeData","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "renounceOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "getCount","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_index","type": "uint256"}],"name": "getData","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "isOwner","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"}]

const private_key = "4db7acba6abf5a75985b3d3701462c45f6efda11f01d653cfa6946cbeec16af3"

const myContract = new web3.eth.Contract(abi,address);

async function getCount() {
    var count= await myContract.methods.getCount().call();
    console.log(count)
}

async function getData(_index){
    var data = await myContract.methods.getData(_index).call();
    console.log(data)
}

