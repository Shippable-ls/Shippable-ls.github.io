
var counter = 0; //donation counter
GetCount(); //Get donation count

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
      document.getElementById("submit-form").value = "Your MetaMask is locked"
      }
      else {
        web3.version.getNetwork((err, netId) => { //check if testnet or mainnet
  switch (netId) {
    case "1":
      document.getElementById("submit-form").value = "Donate*";
      document.getElementById("disclaimer").innerHTML = "*WARNING: You're connected to Mainnet. This dApp is still in testing.";
      break
    case "2":
      document.getElementById("submit-form").value = "Donate*";
      break
    case "3":
      document.getElementById("submit-form").value = "Donate*";
      document.getElementById("disclaimer").innerHTML = "*You're connected to Ropsten.";
      break
    case "4":
      document.getElementById("submit-form").value = "Donate*";
      break
    case "42":
      document.getElementById("submit-form").value = "Donate*";
      break
    default:
      document.getElementById("submit-form").value = "Donate*";
  }
})
      
    
      }
    }
  })

} else { // Else, if there's no web3, ask user to get web3 (Iphone/android/desktop each get a different message)


        if(window.innerWidth <= 800 && window.innerHeight <= 600) {
        document.getElementById("submit-form").value = "Donate.ETH requires Toshi";
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            document.getElementById('submit-form').setAttribute('onclick','window.open("https://itunes.apple.com/us/app/toshi-ethereum/id1278383455?mt=8")');
            }  
            else {
            document.getElementById('submit-form').setAttribute('onclick','window.open("https://play.google.com/store/apps/details?id=org.toshi&hl=en")');
            }
  
        } 
        else {
        document.getElementById("submit-form").value = "Donate.ETH requires MetaMask";
        document.getElementById('submit-form').setAttribute('onclick','window.open("https://metamask.io/")');
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
      document.getElementById("count").innerHTML = "Total Donations: " + newcounter + " ETH (testnet)";
    }, 3000);
    

  });

  
};
});
}

//////////////////////////Donation Count////////////


function GetCount() {
    
    var xhttp = new XMLHttpRequest();
    var charity = document.getElementById("charity").value;
    var url = "https://api-ropsten.etherscan.io/api?module=account&action=balance&address=" + charity + "&tag=latest&apikey=K8BKKCIBTPMY9DT8RIXETN3VWHNE2DAGH7";
    httpGetAsync(url);
}


function httpGetAsync(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        document.getElementById("count").innerHTML = "Total Donations: " + round(WeiToEth(JSON.parse(xmlHttp.responseText).result),5) + " ETH (testnet)";
        counter = round(WeiToEth(JSON.parse(xmlHttp.responseText).result),5);
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}




////////utility functions////////

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function WeiToEth(wei) {
  return wei*0.000000000000000001;
}




