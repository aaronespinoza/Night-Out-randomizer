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

