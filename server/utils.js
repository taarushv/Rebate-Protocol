var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI()
var QRCode = require('qrcode')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
var fs = require('fs')

// Web3 configured to Ropsten test network
const web3 = new Web3('https://ropsten.infura.io/v3/e6780ebea2fe4b1b8dde4c72fa0c78a8')

// Text to URL method
const toQR = async (x) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve((await QRCode.toDataURL(x)))
    } catch (err) {
      console.error('QRCODE ERROR - ' + err)
    }
  })
}

// Distribute Ether
async function distribute (params) {
  var accountFrom = (await web3.eth.accounts.privateKeyToAccount('0x' + params.privateKey).address)
  var index = params.index
  var pKey = params.privateKey
  var n = params.units
  var val = params.value

  // Database Schema
  db.defaults({ [index]: [] })
    .write()
  var accounts = {}
  const privateKeyFrom = Buffer.from(pKey, 'hex')
  var pubKeys, privateKeys

  // Creating accounts to distribute Ether
  for (let i = 0; i < n; i++) {
    var account = await web3.eth.accounts.create()
    accounts[account.address] = account.privateKey
    pubKeys = Object.keys(accounts)
    privateKeys = Object.values(accounts)
  }
  // Convert accounts to QR
  for (let i = 0; i < privateKeys.length; i++) {
    var eachPKey = privateKeys[i]
    // Make QR out of `${index+privatekey}` string
    let qr = await toQR(index + eachPKey)
    // Add QR's to DB
    db.get([index]).push({ [i]: qr }).write()
  }

  // send each Tx
  web3.eth.getTransactionCount(accountFrom).then(async (_nonce) => {
    for (let i = 0; i < pubKeys.length; i++) {
      // Create TX data
      const txObject = {
        from: accountFrom,
        nonce: web3.utils.toHex(_nonce + i),
        to: pubKeys[i],
        value: web3.utils.toHex(web3.utils.toWei(val, 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei'))
      }

      // Sign the transaction

      const tx = new Tx(txObject)
      tx.sign(privateKeyFrom)

      const serializedTx = tx.serialize()
      const raw = '0x' + serializedTx.toString('hex')

      // Broadcast the transaction

      web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        db.get('3').push({ txHash }).write()
        if (err) {
          return (err)
        }
        console.log('txHash:', txHash)
      })
    }
  })
  return ('OK')
}

/*
    Add file to IPFS network
    Make sure IPFS daemon is running
*/

async function pinFile (directory) {
  var data = {
    path: directory,
    content: fs.readFileSync(directory)
  }
  const results = await ipfs.files.add(data)
  return (results[0].hash)
}

exports.distribute = distribute
exports.pinFile = pinFile
