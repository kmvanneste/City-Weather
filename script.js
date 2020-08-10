// VARIABLES
var authKey = "7558419d9a99d2be3b1975a5ecc02218";
var currentDay = moment().format('MMMM Do YYYY');
var currentTime = moment().format('h:mm:ss a');
var citySearch = "";

var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${authKey}`;

//Current Weather Object API Call
function runCurrentQuery(queryURL) {  
    $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var city = response.name;
    var temp = response.main.temp;
    var humidity = response.main.humidity;
    var windSpeed = parseInt(response.wind.speed);
    windSpeed = (windSpeed * 2.237).toFixed(1);
    console.log(windSpeed);
    var icon = response.weather[0].icon;
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var queryTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${authKey}`;
//One Call API 
    $.ajax({
      url: queryTwo,
      method: "GET",
    }).then(function (responseTwo) {
      console.log(queryTwo);
      var uvi = parseInt(responseTwo.current.uvi);
        
      $("#card").removeClass(".hide");
      $(".city-name").text(city);
      $(".card-img-top").attr("src", "cloud.jpg");
      $(".card-title").html(currentDay);
      $(".temperature").html("Temperature: " + temp);
      $(".humidity").html("Humidity: " + humidity);
      $(".wind").html("Wind Speed: " + windSpeed + " mph")
      $(".uvIndex").html("UV Index: " + uvi);

      function uvColorChange () {
      if (uvi < 3) {
          $(".uvIndex").css("background-color", "#66b447");
      } else if (uvi < 6) {
        $(".uvIndex").css("background-color", "#ffe135");
      } else if (uvi < 9) {
        $(".uvIndex").css("background-color", "#ff631c");
      } else {
        $(".uvIndex").css("background-color", "#ff0800");
      }
    }
      uvColorChange();

      var dayOneTemp = responseTwo.daily[0].temp.day;
      console.log(dayOneTemp);
      var dayTwoTemp = responseTwo.daily[1].temp.day;
      var dayThreeTemp = responseTwo.daily[2].temp.day;
      var dayFourTemp = responseTwo.daily[3].temp.day;
      var dayFiveTemp = responseTwo.daily[4].temp.day;

      var dayOneH = responseTwo.daily[0].humidity;
      var dayTwoH = responseTwo.daily[1].humidity;
      var dayThreeH = responseTwo.daily[2].humidity;
      var dayFourH = responseTwo.daily[3].humidity;
      var dayFiveH = responseTwo.daily[4].humidity;
    
      function fiveDayForecast() {
        
        $("#day1").html((moment().add(1, 'days')).format('LL'));
        $("#dayOneContent").text("Temperature: " + dayOneTemp + "  Humidity: " + dayOneH);

        $("#day2").html((moment().add(2, 'days')).format('LL'));
        $("#dayTwoContent").html("Temperature: " + dayTwoTemp + "  Humidity: " + dayTwoH);

        $("#day3").html((moment().add(3, 'days')).format('LL'));
        $("#dayThreeContent").html("Temperature: " + dayThreeTemp + "  Humidity: " + dayThreeH);

        $("#day4").html((moment().add(4, 'days')).format('LL'));
        $("#dayFourContent").html("Temperature: " + dayFourTemp + "  Humidity: " + dayFourH);

        $("#day5").html((moment().add(5, 'days')).format('LL'));
        $("#dayFiveContent").html("Temperature: " + dayFiveTemp + "  Humidity: " + dayFiveH);
    }
    fiveDayForecast();

    });
  });
}

//for (var i=0; i<response.docs.length; i++)

// On Click
$("#searchBtn").on("click", function () {
  citySearch = $("#search").val().trim();

  var newCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${authKey}`;

  runCurrentQuery(newCurrentWeather);

  var newButton = $("<button>");
  newButton.addClass("btn btn-secondary");
  newButton.attr("type", "button");
  newButton.html(citySearch);
  $("#btn-group").prepend(newButton);

  newButton.on("click", function () {
    citySearch = newButton.html();
    newCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${authKey}`;
    runCurrentQuery(newCurrentWeather);

    return false;
  });

  return false;

});
