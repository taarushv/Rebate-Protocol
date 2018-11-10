var fs = require('fs');
var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI()
// have IPFS Daemon running in the background
async function pinFile(){
    // sample test json 
    var data = {
        path: '../playground/database.json',
        content: fs.readFileSync('../playground/database.json')
    }
    const results = await ipfs.files.add(data)
    console.log(results);
    // file hash is QmSrH21SgAPST9gA4c2ZaM8JebAwBjiJQaiX2iTyXaNMRN <= results[0].hash
}

pinFile()