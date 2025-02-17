//questions should be replaced by i
let venueAddress;
function randomEvent(data, random){
    //if an error is thrown in console there is likely
    //no events on the selected date in the selected city
    //questionsLocation.textContent= random.valueOf;
    venueAddress = data.events[random].venue.address+" "+
    data.events[random].venue.state+", "+
    data.events[random].venue.postal_code
    console.log(venueAddress)
};

//date dropdown function
$( function() {
  $( "#datepicker" ).datepicker();
} );

function searchResults(city, date) {
  
var date= document.querySelector("#datepicker").value;
var cityInput= document.querySelector("#exampleDataList").value;
//converts cities with spaces in the name to have a plus instead for url
console.log(cityInput);
var city= cityInput.split(' ').join('+');


  var requestUrl = "https://api.seatgeek.com/2/events?venue.city=" + city +"&datetime_utc=" + date + "&client_id=MjU3NjM4NjF8MTY0NTE0OTEzNy40MDQxMjU3";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var random = Math.floor(Math.random()*data.events.length);
      randomEvent(data, random)
      console.log(data, random)
      
      printEventResults(data, random);
        
        
      
    });
}
//print event result container
var eventContainer= document.getElementById("eventPop");

//PRINT RESULTS function
function printEventResults(data, random){
  console.log(data);
  //Create elements
  var title = document.createElement("h3");
  var eventUrl= document.createElement("a");
  var eventAddress= document.createElement("p");
  //Set the text content
  eventContainer.innerHTML= "";
  eventAddress.textContent= venueAddress;
  title.textContent= data.events[random].title;
  eventUrl.textContent = 'More Info';
  //add a link to respective event on seatgeek
  eventUrl.setAttribute('href', data.events[random].url);
  //add bootstrap classes
  eventUrl.classList.add('btn', 'btn-dark');
  eventAddress.classList.add('pointA');


  //Appending elements
  eventContainer.append(title);
  eventContainer.append(eventUrl);
  eventContainer.append(eventAddress);
}

//Yelp Randomizer
//questions should be replaced by i
var yelpAddress;
function randomYelp(data, random){
    
    //questionsLocation.textContent= random.valueOf;
    yelpAddress = data.businesses[random].location.address1+" "+
    data.businesses[random].location.state+", "+
    data.businesses[random].location.zip_code
    console.log(yelpAddress)
}

function businessResults(city, date) {
  
 //var date= document.querySelector("#dateInput").value;
var cityInput= document.querySelector("#exampleDataList").value;
//converts cities with spaces in the name to have a plus instead for url
var date= "2021-12-05";
//var city= "new+york"
console.log(cityInput);
var city= cityInput.split(' ').join('+');


  var yelpUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=" + city;

  fetch(yelpUrl, {
	'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer mk3i4VEQd51z903msKzH-_cj4YaqU6JADhfw4k1P1Ftj1o1MFdJ_GGBKVX8z19CVhbiKscgVsLxXub6OFPwofvwDzx1TXU2VoEqHkrbF0LTaJO4-A1ONf7V6f2mdYXYx'
      }
})
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var random = Math.floor(Math.random()*data.businesses.length);
      randomYelp(data, random)
      console.log(data, random)
      
      printResults(data, random);
        
        
      
    });
}
//print event result container
var businessContainer= document.getElementById("yelpPop");
//PRINT RESULTS function
function printResults(data, random){
  console.log(data);
  //Create elements
  var yelpTitle = document.createElement("h3");
  var yelpUrl= document.createElement("a");
  var businessAddress= document.createElement("p");
  //Set the text content
  businessContainer.innerHTML= "";
  businessAddress.textContent= yelpAddress;
  yelpTitle.textContent= data.businesses[random].name;
  yelpUrl.textContent = 'More Info';
  //add a link to respective event on seatgeek
  yelpUrl.setAttribute('href', data.businesses[random].url);
  //add bootstrap classes
  yelpUrl.classList.add('btn', 'btn-dark');
  businessAddress.classList.add('pointB');


  //Appending elements
  businessContainer.append(yelpTitle);
  businessContainer.append(yelpUrl);
  businessContainer.append(businessAddress);
}

// event listener for showing event results from location search

var rerollBtn = document.querySelector('#rerollBtn');
var soundsGoodBtn = document.querySelector('#soundsGoodBtn');


// needs searchResults function
rerollBtn.addEventListener("click", function(){
    searchResults()
    businessResults()
    calcRoute()
});

// event listener for mapping route to event
// needs mappingRoute function

//soundsGoodBtn.addEventListener("click", mappingRoute);

//soundsGoodBtn.addEventListener("click", mappingRoute);


//javascript.js
//set map options
var myLatLng = { lat: 34.0522, lng: -118.2437 };
var mapOptions = {
    center: myLatLng,
    zoom:10,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

//stringify addresses

const start= JSON.stringify(venueAddress);
const end= JSON.stringify(yelpAddress);

console.log(start,end)

//define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: venueAddress,
        
        destination: yelpAddress,
        // origin: document.querySelector("pointA").value,
        // destination: document.querySelector("pointB").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info bg-light opacity-75 text-dark'>From: " + origin + ".<br />To: " + destination + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });
    console.log("the calc route worked")

}



//create autocomplete objects for all inputs
var options1 = {
    types: ['(regions)']
}
var options2 = {
    types: ['(restaurants)']
}
  
var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options1);
  
var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options2);``