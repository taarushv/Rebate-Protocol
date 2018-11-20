const express = require('express')
const app = express()
var utils = require('./utils')
var bodyParser = require('body-parser')
var path = require('path')
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

// Api Status
app.get('/', (req, res) => {
  res.send('api running')
})

// Get DB
app.get('/api/database', (req, res) => {
  res.sendFile(path.join(__dirname, './db.json'))
})

// Distribute ether based on params
app.post('/api/distribute', (req, res) => {
  var params = {
    index: req.body.index,
    units: req.body.units,
    privateKey: req.body.key,
    value: req.body.value
  }
  var distributeResponse = utils.distribute(params)
  res.send(distributeResponse)
})

// Pin file on IPFS network
app.post('/api/ipfs-pin', async (req, res) => {
  var fileDir = req.body.file
  var hash = await utils.pinFile(fileDir)
  res.send(hash)
})

app.listen(8008, () => console.log('Rebate backend app listening on port 8008!'))
