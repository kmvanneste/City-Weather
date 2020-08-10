// VARIABLES
var authKey = "7558419d9a99d2be3b1975a5ecc02218";

var citySearch = "";

var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${authKey}`;

var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${authKey}`;


//Current Weather Object API with 
function runCurrentQuery(queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
      })  .then(function(response) {
    //SETTING VARIABLES TO RETRIEVE INFORMATION FROM ANOTHER API
         var lat = response.coord.lat
         var lon = response.coord.lon
         var queryTwo = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + authKey;
    //RETRIEVING INFORMATION FROM OPENWEATHER API: ONE CALL API
         $.ajax({
             url: queryTwo,
             method: "GET"
         })
             .then(function (responseTwo) {
                 console.log(queryTwo)
                 console.log(responseTwo)
                 //City Name

                 
                 $(".uvIndex").text("UV Index: " + responseTwo.current.uvi);
                 console.log(parseInt(responseTwo.current.uvi))
        
        
                });
        })
}

//for (var i=0; i<response.docs.length; i++)

// On Click
$("#searchBtn").on('click', function() {

    citySearch = $("#search").val().trim();

    var newCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${authKey}`;
   
    runCurrentQuery(newCurrentWeather);

    var newButton = $("<button>");
    newButton.addClass("btn btn-secondary")
    newButton.attr("type", "button");
    newButton.html(citySearch);
    $("#btn-group").prepend(newButton);

    newButton.on('click', function() {
        citySearch = newButton.html();
        newCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${authKey}`;
        runCurrentQuery(newCurrentWeather);
    })

    return false;
})

