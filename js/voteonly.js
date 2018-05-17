

// Is there an injected web3 instance?
if (typeof web3 !== 'undefined') {
  web3Provider = web3.currentProvider;
 } else {
   document.getElementById("web3reminder").innerHTML = "You'll need Metamask connected to Ropsten in order to see the results."
  // If no injected web3 instance is detected, fall back to Infura
   web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/Njt2otjIXgtpcsbCtIhW');
}

web3 = new Web3(web3Provider);
abi = JSON.parse('[{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"votesCast","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}]')
VotingContract = web3.eth.contract(abi);
contractInstance = VotingContract.at('0x3c951e4555346e6eef322b16e2cdc0224e7d4236');




// Vote function

function vote(candidate) {

  web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }
var account = accounts[0];
contractInstance.voteForCandidate(candidate, {from: account}, {gas: "30000"}, {gasPrice: web3.toWei(5,'gwei')}, function(error,value) {
  if (!error) {
    document.getElementById("web3reminder").innerHTML = "Thanks for voting! Your vote is being counted."
  }
  });
});
}


////////////////////////////

