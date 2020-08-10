// VARIABLES

var authKey = "7558419d9a99d2be3b1975a5ecc02218";

var citySearch = "";

var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${authKey}`;

var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${authKey}`;



// FUNCTIONS

//Current Weather Object
function runCurrentQuery(queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
      })  .then(function(response) {
        //City Name
        console.log(response.name);
        //Icon
        console.log(response.weather[1].icon);
        //Temp in Kelvin
        console.log(response.main.temp);
        //Humidity
        console.log(response.main.humidity);
        //Wind Speed
        console.log()




        console.log(queryURL);
        console.log(response);
      });
}

//Five Day Forecast Object
function runForecastQuery(queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
      })  .then(function(response) {

        for (var i=0; i<response.docs.length; i++)

        // for (var i=0; i < response.list.length; i++) {
        //     var futureWeather = [];
        //     if (response.list.dt_txt.charAt(12) === 5) {
        //         console.log(futureWeather.push(response.list[i]))
        //     }
        // }



        console.log(queryURL);
        console.log(response);
      });
}

// On Click
$("#searchBtn").on('click', function() {

    citySearch = $("#search").val().trim();

    var newCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${authKey}`;
 
    var newFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${authKey}`;
   
    runCurrentQuery(newCurrentWeather);
    runForecastQuery(newFiveDay);

    return false;
})

//1. Retrieve user inputs and convert to variables
//2. Use those variables to run on AJAX call to the weather website
//3. Break down the Weather Object into usable fields
//4. Dynamically generate html content

//5. Dealing with "edge cases" -- bugs or unusual situations that are not intuitive.
