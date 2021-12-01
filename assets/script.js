//questions should be replaced by i
var venueAddress;
function randomEvent(data, random){
    
    //questionsLocation.textContent= random.valueOf;
    venueAddress = data.events[random].venue.address+" "+
    data.events[random].venue.state+", "+
    data.events[random].venue.postal_code
    console.log(venueAddress)
}

function searchResults(city, date) {
  
 //var date= document.querySelector("#dateInput").value;
var cityInput= document.querySelector("#exampleDataList").value;
//converts cities with spaces in the name to have a plus instead for url
var date= "2021-12-05";
//var city= "new+york"
console.log(cityInput);
var city= cityInput.split(' ').join('+');


  var requestUrl = "https://api.seatgeek.com/2/events?venue.city=" + city +"&datetime_utc=" + date + "&client_id=MjQ1OTMwNzJ8MTYzNzcwMDU2MS4xNzA0MjYx";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var random = Math.floor(Math.random()*data.events.length);
      randomEvent(data, random)
      console.log(data, random)
      
      printResults(data, random);
        
        
      
    });
}
//print event result container
var eventContainer= document.getElementById("eventPop");
//PRINT RESULTS function
function printResults(data, random){
  console.log(data);
  //Create elements
  var title = document.createElement("h3");
  var eventUrl= document.createElement("a");
  var eventAddress= document.createElement("p");
  //Set the text content
  eventAddress.textContent= venueAddress;
  title.textContent= data.events[random].title;
  eventUrl.textContent = 'More Info';
  //add a link to respective event on seatgeek
  eventUrl.setAttribute('href', data.events[random].url);
  //add bootstrap classes
  eventUrl.classList.add('btn', 'btn-dark');

  //Appending elements
  eventContainer.append(title);
  eventContainer.append(eventUrl);
  eventContainer.append(eventAddress);
}
// event listener for showing event results from location search

var rerollBtn = document.querySelector('#rerollBtn');
var soundsGoodBtn = document.querySelector('#soundsGoodBtn');


// needs searchResults function
rerollBtn.addEventListener("click", searchResults);

// event listener for mapping route to event
// needs mappingRoute function
//soundsGoodBtn.addEventListener("click", mappingRoute);
