var fs = require('fs');
var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI()
// have IPFS Daemon running in the background
async function pinFile(directory){
    // sample test json 
    var data = {
        path: directory,
        content: fs.readFileSync(directory)
    }
    const results = await ipfs.files.add(data)
    console.log(results);
    // file hash is QmSrH21SgAPST9gA4c2ZaM8JebAwBjiJQaiX2iTyXaNMRN <= results[0].hash
}

