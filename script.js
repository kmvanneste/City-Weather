// SETUP VARIABLES
//======================================================

var authKey = "7558419d9a99d2be3b1975a5ecc02218";

var citySearch = "London";

var currentWeatherURL = `api.openweathermap.org/data/2.5/weather?q=
${citySearch}&appid=${authKey}`;

var fiveDayURL = `api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${authKey}`;


// FUNCTIONS
//======================================================

function runQuery(citySearch, queryURL) {

    // AJAX Function 
    $.ajax({
        url: queryURL,
        method: "GET"
      })  .then(function(response) {
        console.log(queryURL);
        console.log(response);
      });
    
      

}



//MAIN PROCESSES
//======================================================
$("#searchBtn").on('click', function() {
    runQuery(citySearch, currentWeatherURL);

    return false;
})

//1. Retrieve user inputs and convert to variables
//2. Use those variables to run on AJAX call to the weather website
//3. Break down the Weather Object into usable fields
//4. Dynamically generate html content

//5. Dealing with "edge cases" -- bugs or unusual situations that are not intuitive.
