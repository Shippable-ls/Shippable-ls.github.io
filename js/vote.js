

// Is there an injected web3 instance?
if (typeof web3 !== 'undefined') {
  web3Provider = web3.currentProvider;
 } else {
   document.getElementById("justifiedcontainer").style.display = "none";
   document.getElementById("web3reminder").innerHTML = "You'll need Metamask installed and connected to Ropsten."
  // If no injected web3 instance is detected, fall back to Infura
   web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/Njt2otjIXgtpcsbCtIhW');
}

web3 = new Web3(web3Provider);
abi = JSON.parse('[{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"votesCast","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}]')
VotingContract = web3.eth.contract(abi);
contractInstance = VotingContract.at('0x3c951e4555346e6eef322b16e2cdc0224e7d4236');


var bar1 = 1;
var bar2 = 2;
var bar3 = 3;
var values = [];


function Update() {

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }
  var account = accounts[0];

     contractInstance.totalVotesFor.call('Slack', {from: account}, function(error, result) {
     var bar1 = result;
     contractInstance.totalVotesFor.call('Discord', {from: account}, function(error, result) {
     var bar2 = result;
     contractInstance.totalVotesFor.call('Whatsapp', {from: account}, function(error, result) {
     var bar3 = result;
     contractInstance.totalVotesFor.call('Telegram', {from: account}, function(error, result) {
     var bar4 = result;
     contractInstance.totalVotesFor.call('Mainframe', {from: account}, function(error, result) {
     var bar5 = result;
     contractInstance.totalVotesFor.call('Signal', {from: account}, function(error, result) {
     var bar6 = result;
     contractInstance.totalVotesFor.call('Rocketchat', {from: account}, function(error, result) {
     var bar7 = result;
     var values = [bar1,bar2,bar3];
     var totalvotes = +bar1 + +bar2 + +bar3;
     document.getElementById("votecounter").innerHTML = "Vote count: " + totalvotes;
     drawChart(values,"#chart",1);
  });
  });
  });
  });
  });
  });
  });
    });
}


Update();



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


// drawChart(values,"#chart",10) // You can adjust the margin between each bar by changing 10 to whatever you like

function drawChart(data,selector,padding){
  var max = Math.max.apply(Math, data);
  var chart = document.querySelector(selector);
  var barwidth = ((chart.offsetWidth-(values.length-1)*padding-(data.length)*10)/data.length);
  var sum = data.reduce(function(pv, cv) { return pv + cv; }, 0);
  var left = 0;
  for (var i in data){
    var newbar = document.createElement('div');
    newbar.setAttribute("class", "bar");
    newbar.style.width=barwidth+"px";
    newbar.style.height=((data[i]/max)*100)+"%";
    newbar.style.left=left+"px";
    chart.appendChild(newbar);
    left += (barwidth+padding+10);
  }
}
