
var counter = 0; // Donation counter
GetCount("https://api.etherscan.io/"); //Get donation count
var network = "Mainnet"; //assume Mainnet until network ID checked

////////CHECK IF WEB3//////

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
  //If there's web3, make sure it's not locked
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
    console.log(error);
    }
    else {
      if (accounts.length == 0){
      document.getElementById("submit-form").value = "Your MetaMask is locked*"
      document.getElementById("disclaimer").innerHTML = "*Please unlock Metamask in order to donate";
      }
      else {
        web3.version.getNetwork(function(err, netId) { //check if testnet or mainnet
  switch (netId) {
    case "1":
      document.getElementById("submit-form").value = "Donate*";
      document.getElementById("disclaimer").innerHTML = "*WARNING: You're connected to Mainnet.";
      break
    case "2":
      document.getElementById("submit-form").value = "Donate*";
      document.getElementById("disclaimer").innerHTML = "*You're connected to a testnet.";
      break
    case "3":
      document.getElementById("submit-form").value = "Donate*";
      document.getElementById("disclaimer").innerHTML = "*You're connected to Ropsten.";
      network = "Ropsten";
      GetCount("https://api-ropsten.etherscan.io/");
      break
    case "4":
      document.getElementById("submit-form").value = "Donate*";
      document.getElementById("disclaimer").innerHTML = "*You're connected to a testnet.";
      break
    case "42":
      document.getElementById("submit-form").value = "Donate*";
      document.getElementById("disclaimer").innerHTML = "*You're connected to a testnet.";
      break
    default:
      document.getElementById("submit-form").value = "Donate*";
      document.getElementById("disclaimer").innerHTML = "*You're connected to a testnet.";
  }
})
      
    
      }
    }
  })

} else { // Else, if there's no web3, ask user to get web3 (Iphone/android/desktop each get a different message)


        if(window.innerWidth <= 800 && window.innerHeight <= 600) {
        document.getElementById("submit-form").value = "Install Toshi*";
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            document.getElementById('submit-form').setAttribute('onclick','window.open("https://itunes.apple.com/us/app/toshi-ethereum/id1278383455?mt=8")');
            document.getElementById("disclaimer").innerHTML = "*You'll need a Web3 provider in order to use Donate.eth";
            }  
            else {
            document.getElementById('submit-form').setAttribute('onclick','window.open("https://play.google.com/store/apps/details?id=org.toshi&hl=en")');
            document.getElementById("disclaimer").innerHTML = "*You'll need a Web3 provider in order to use Donate.eth";
            }
  
        } 
        else {
        document.getElementById("submit-form").value = "Install MetaMask*";
        document.getElementById('submit-form').setAttribute('onclick','window.open("https://metamask.io/")');
        document.getElementById("disclaimer").innerHTML = "*You'll need a Web3 provider in order to use Donate.eth";
        }
  
   }


        
//////////SEND TRANSACTION///////            


function Donate() {

  web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

else {
   
  var account = accounts[0];
  var amount = document.getElementById("amount").value;
  var charity = document.getElementById("charity").value;
  web3.eth.sendTransaction({from: account, to: charity, value:web3.toWei(amount, "ether"), gasPrice: web3.toWei(5,'gwei')}, function(err, transactionHash){
    if (!err) //if TX submitted, increment donation counter
    setTimeout(function(){ 
      var newcounter = +counter + +amount;
      document.getElementById("count").innerHTML = "Total Donations: " + round(newcounter) + " ETH " + network;
    }, 1000);
    

  });

  
};

});
}

//////////////////////////Donation Count//////////// 


function GetCount(theURL) {
    
   //var xhttp = new XMLHttpRequest();
    var charity = document.getElementById("charity").value;
    var url =  theURL + "api?module=account&action=balance&address=" + charity + "&tag=latest&apikey=K8BKKCIBTPMY9DT8RIXETN3VWHNE2DAGH7";
   // httpGetAsync(url);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
    	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        document.getElementById("count").innerHTML = "Total Donations: " + round(WeiToEth(JSON.parse(xmlHttp.responseText).result),5) + " ETH " + network;
        counter = round(WeiToEth(JSON.parse(xmlHttp.responseText).result),5);
        }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
} 


////////utility functions////////

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function WeiToEth(wei) {
  return wei*0.000000000000000001;
}
