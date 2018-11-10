window.addEventListener('load', async () => {
    // making it compatible to upcoming metamask update
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            ethereum.enable();
            console.log('success')
            // Acccounts now exposed
        } catch (error) {
            // User denied account access...
            alert('refresh and unlock metamask')
        }
    }
    // Legacy metamask object
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    }
    // Non-dapp browsers
    else {
        alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});