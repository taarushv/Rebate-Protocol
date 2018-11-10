// test contract 

const address ="0x7c05fde11b22224646ab1ee09de2be21813349b9";
const abi = [{"constant":false,"inputs":[{"name":"_index","type":"uint256"},{"name":"_ipfsHash","type":"string"}],"name":"addData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"_index","type":"uint256"}],"name":"removeData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"getData","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]

var rebateContract = web3.eth.contract(abi);
var rebateContractInstance = rebateContract.at(address)



function getCount(){
    rebateContractInstance.getCount.call( function(error,response){
        if(error){
            console.log(error);
        }
        console.log(response.c[0]); 
    })
}

/*
test
>getCount()
output:1
*/
function getData(index){
    rebateContractInstance.getData.call(index, function(error,response){
        if(error){
            console.log(error);
        }
        console.log(response)
    })
}

/*
test
>getData(1)
output:QmfM2r8seH2GiRaC4esTjeraXEachRt8ZsSeGaWTPLyMoG
*/