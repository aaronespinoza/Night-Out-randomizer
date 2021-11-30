
//Fetch Api

var tableBody = document.getElementById('repo-table');
var fetchButton = document.getElementById('fetch-button');

//questions should be replaced by i
function randomEvent(){
    var random = Math.floor(Math.random()*questions.length);
    //questionsLocation.textContent= random.valueOf;
    questionsLocation.textContent=questions[random];
}

//variable for date
//var dateInput=
//variable for location
//var cityInput=

function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
var date= document.querySelector("#datePicker").value

  var requestUrl = "https://api.seatgeek.com/2/events&client_id=MjQ1OTMwNzJ8MTYzNzcwMDU2MS4xNzA0MjYx&datetime_utc="+date;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      //Loop over the data to generate a table, each table row will have a link to the repo url
      for (var i = 0; i < data.events.length; i++) {
        // Creating elements, tablerow, tabledata, and anchor
        var createTableRow = document.createElement('tr');
        var tableData = document.createElement('td');
        var link = document.createElement('a');

        // Setting the text of link and the href of the link
        link.textContent = data[i].datetime_utc;
        link.href = data[i].html_url;

        // Appending the link to the tabledata and then appending the tabledata to the tablerow
        // The tablerow then gets appended to the tablebody
        tableData.appendChild(link);
        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
      }
    });
}
// event listener for showing event results from location search

var rerollBtn = document.querySelector('#rerollBtn');
var soundsGoodBtn = document.querySelector('#soundsGoodBtn');


// needs searchResults function
rerollBtn.addEventListener("click", searchResults);

// event listener for mapping route to event
// needs mappingRoute function
soundsGoodBtn.addEventListener("click", mappingRoute);




// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}