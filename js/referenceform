

/////////////////////Set questions, Candidate name & Referee name///////////////

var questions = "What were x's achievements and failures whilst working with you? LINEBREAK What would you perceive x's strengths and weaknesses to be? LINEBREAK Please name two scenario's you think x would struggle in & thrive in. LINEBREAK Why did you originally decide to hire x and what process did x go through? LINEBREAK Please add anything it would be useful to useful know about how best to work with x.";
var questionsarray = questions.split(" LINEBREAK ");
var randomqarray = shuffle(questionsarray);
var candidate = capitalizeFirstLetter(getParameterByName('candidate'));
var cs = capitalizeFirstLetter(getParameterByName('cs'));
var referee = capitalizeFirstLetter(getParameterByName('referee'));
var rs = capitalizeFirstLetter(getParameterByName('rs'));
var Q1 = "Please, can you confirm; " + candidate +"'s work dates, job title and relationship with you (manager, colleague etc)";
var Q2 = randomqarray[1].replace(/x/g, candidate);
var Q3 = randomqarray[2].replace(/x/g, candidate);
var Q4 = randomqarray[3].replace(/x/g, candidate);
var Q5 = randomqarray[4].replace(/x/g, candidate);



//////////////////////////////////FORM SUBMIT//////////

var $form = $('form#test-form'),
    url = 'https://script.google.com/macros/s/AKfycbxqZlKA-cwZEmgyTUABVcsHJ5TXUTHiJC7j8RhZFwYqAqATP5yB/exec';

$('#submit-form').on('click', function(e) {
  document.getElementById("submit-form").value = "Submiting reference...";
  e.preventDefault();
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serializeObject()
  }).done(function(data){
    document.getElementById("submit-form").value = "Reference submitted. Thank you!";
  });
})




////////////////////////INIT THE PAGE///////


function InitPage() {
    

$('html,body').scrollTop(0);
document.getElementById("test-form").reset();
document.getElementById("form_field_1").value = hex_md5(getParameterByName('candidate')); //candidate ID
document.getElementById("form_field_3").value = hex_md5(Q1); //Q1 ID
document.getElementById("form_field_5").value = hex_md5(Q2); //Q2 ID
document.getElementById("form_field_7").value = hex_md5(Q3); //Q3 ID
document.getElementById("form_field_9").value = hex_md5(Q4); //Q4 ID
document.getElementById("form_field_10").value = candidate + " " + cs;
document.getElementById("form_field_11").value = referee + " " + rs;
document.getElementById('Q1').innerHTML = Q1;
document.getElementById('Q2').innerHTML = Q2;
document.getElementById('Q3').innerHTML = Q3;
document.getElementById('Q4').innerHTML = Q4;
document.getElementById('Candidate').innerHTML = "Candidate: " + candidate + " " + cs; 
document.getElementById('Referee').innerHTML = "Referee: " + referee + " " + rs;
 
}    
    

InitPage();



//////////////UTILITY FUNCTIONS////////////////

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

////////

$('submit-form').click(function(){
    $(this).animate({height:'3000'})
})
