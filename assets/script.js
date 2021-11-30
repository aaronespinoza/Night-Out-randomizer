//questions should be replaced by i


var venueAddress;
function randomEvent(data){
    var random = Math.floor(Math.random()*data.events.length);
    //questionsLocation.textContent= random.valueOf;
    venueAddress = data.events[random].venue.address+" "+
    data.events[random].venue.state+", "+
    data.events[random].venue.postal_code
    console.log(venueAddress)
}

function searchResults(city, date) {
  
 var date= document.querySelector("#dateInput").value
 var cityInput= document.querySelector("#datalistOptions").value
//converts cities with spaces in the name to have a plus instead for url
//var date= "2021-12-04"
//var city= "new+york"
var city= cityInput.split(' ').join('+');


  var requestUrl = "https://api.seatgeek.com/2/events?venue.city=" + city +"&datetime_utc=" + date + "&client_id=MjQ1OTMwNzJ8MTYzNzcwMDU2MS4xNzA0MjYx";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      randomEvent(data)
      console.log(data)
      //Loop over the data to generate a table, each table row will have a link to the repo url
      
        printResults(data.events[i]);
        
        
      
    });
}
<<<<<<< HEAD

=======
>>>>>>> main
// event listener for showing event results from location search

var rerollBtn = document.querySelector('#rerollBtn');
var soundsGoodBtn = document.querySelector('#soundsGoodBtn');


// needs searchResults function
rerollBtn.addEventListener("click", searchResults);

// event listener for mapping route to event
// needs mappingRoute function
soundsGoodBtn.addEventListener("click", mappingRoute);
