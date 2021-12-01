//Yelp restaurant randomizer
var yelpAddress;
function randomYelp(data, random){
    
    //questionsLocation.textContent= random.valueOf;
    yelpAddress = data.businesses[random].location.address+" "+
    data.businesses[random].location.state+", "+
    data.businesses[random].location.zip_code
    console.log(yelpAddress)
}

function searchResults(city) {
  
 //var date= document.querySelector("#dateInput").value;
var cityInput= document.querySelector("#exampleDataList").value;
//converts cities with spaces in the name to have a plus instead for url
//var city= "new+york"
console.log(cityInput);
var city= cityInput.split(' ').join('+');


  var yelpUrl = "https://api.yelp.com/v3/businesses/search?term=restaurants&location=" + city;

  fetch(yelpUrl, {
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer mk3i4VEQd51z903msKzH-_cj4YaqU6JADhfw4k1P1Ftj1o1MFdJ_GGBKVX8z19CVhbiKscgVsLxXub6OFPwofvwDzx1TXU2VoEqHkrbF0LTaJO4-A1ONf7V6f2mdYXYx"
      }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var randomYelp = Math.floor(Math.random()*data.businesses.length);
      randomEvent(data, random)
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
  var restaurantAddress= document.createElement("p");
  //Set the text content
  restaurantAddress.textContent= yelpAddress;
  title.textContent= data.events[random].title;
  yelpUrl.textContent = 'More Info';
  //add a link to respective event on seatgeek
  yelpUrl.setAttribute('href', data.events[random].url);
  //add bootstrap classes
  yelpUrl.classList.add('btn', 'btn-dark');

  //Appending elements
  eventContainer.append(yelpTitle);
  eventContainer.append(yelpUrl);
  eventContainer.append(restaurantAddress);
}