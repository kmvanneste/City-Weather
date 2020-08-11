$(document).ready(function () {
  // VARIABLES
  var authKey = "7558419d9a99d2be3b1975a5ecc02218";
  var currentDay = moment().format("LL");
  var citySearch = "";
  var location = JSON.parse(localStorage.getItem("location")) || [];
  for (var i=0; i < location.length; i++) {
      createButton(location[i]);
  }

function createButton(citySearch) {
  var newButton = $("<button>");
  newButton.addClass("btn btn-secondary");
  newButton.attr("type", "button");
  newButton.html(citySearch);
  $("#btn-group").prepend(newButton);

  newButton.on("click", function () {
    citySearch = newButton.html();
    newCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${authKey}`;
    runCurrentQuery(newCurrentWeather);
    $(".card").removeClass("hide");
    $(".future-forecast").removeClass("hide");
});
}


  function runCurrentQuery(queryURL) {
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
    

      var city = response.name;
      var temp = response.main.temp;
      temp = Math.round((temp - 273.15) * (9/5) + 32);
      var humidity = response.main.humidity;
      var windSpeed = parseInt(response.wind.speed);
      windSpeed = (windSpeed * 2.237).toFixed(1);
      console.log(windSpeed);
      var icon = response.weather[0].icon;
      var description = response.weather[0].description;
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var queryTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${authKey}`;

      $(".weather").html(
        "Conditions: " +
          response.weather[0].description +
          " <img src='https://openweathermap.org/img/w/" +
          response.weather[0].icon +
          ".png'>"
      );

      //One Call API
      $.ajax({
        url: queryTwo,
        method: "GET",
      }).then(function (responseTwo) {
        console.log(queryTwo);
        var uvi = parseInt(responseTwo.current.uvi);
        $("#card").removeClass(".hide");
        $(".city-name").text(city);
        $(".description").text(description);

        $("#weather-icon").html("<img id='main-weather-icon' src='https://openweathermap.org/img/w/" + icon + ".png'>");
    
        $(".card-title").html(currentDay);
        $(".temperature").html(temp + "℉");
        $(".humidity").html("Humidity: " + humidity + "%");
        $(".wind").html("Wind Speed: " + windSpeed + " mph");
        $(".uvIndex").html("UV Index: " + uvi);

        function uvColorChange() {
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

        var dayOneIcon = responseTwo.daily[0].weather[0].icon;
        $("#weather-icon").html(
            "<img src='https://openweathermap.org/img/w/" + icon + ".png'>"
          );

        var dayTwoIcon = responseTwo.daily[1].weather[0].icon;
        var dayThreeIcon = responseTwo.daily[2].weather[0].icon;
        var dayFourIcon = responseTwo.daily[3].weather[0].icon;
        var dayFiveIcon = responseTwo.daily[4].weather[0].icon;

        var dayOneTemp = parseInt(responseTwo.daily[0].temp.day);
        dayOneTemp = Math.round((dayOneTemp - 273.15) * (9/5) + 32);
        var dayTwoTemp = parseInt(responseTwo.daily[1].temp.day);
        dayTwoTemp = Math.round((dayTwoTemp - 273.15) * (9/5) + 32);
        var dayThreeTemp = parseInt(responseTwo.daily[2].temp.day);
        dayThreeTemp = Math.round((dayThreeTemp - 273.15) * (9/5) + 32);
        var dayFourTemp = parseInt(responseTwo.daily[3].temp.day);
        dayFourTemp = Math.round((dayFourTemp - 273.15) * (9/5) + 32);
        var dayFiveTemp = parseInt(responseTwo.daily[4].temp.day);
        dayFiveTemp = Math.round((dayFiveTemp - 273.15) * (9/5) + 32);
       

        var dayOneH = responseTwo.daily[0].humidity;
        var dayTwoH = responseTwo.daily[1].humidity;
        var dayThreeH = responseTwo.daily[2].humidity;
        var dayFourH = responseTwo.daily[3].humidity;
        var dayFiveH = responseTwo.daily[4].humidity;

        function fiveDayForecast() {
          $("#day1").html(moment().add(1, "days").format("ddd D"));
          $("#dayOneContent").text(
            "Temperature: " + dayOneTemp + "℉" + "  Humidity: " + dayOneH + "%"
          );

          $("#day2").html(moment().add(2, "days").format("ddd D"));
          $("#dayTwoContent").html(
            "Temperature: " + dayTwoTemp + "℉" + "  Humidity: " + dayTwoH + "%"
          );

          $("#day3").html(moment().add(3, "days").format("ddd D"));
          $("#dayThreeContent").html(
            "Temperature: " + dayThreeTemp + "℉" + "  Humidity: " + dayThreeH + "%"
          );

          $("#day4").html(moment().add(4, "days").format("ddd D"));
          $("#dayFourContent").html(
            "Temperature: " + dayFourTemp + "℉" + "  Humidity: " + dayFourH + "%"
          );

          $("#day5").html(moment().add(5, "days").format("ddd D"));
          $("#dayFiveContent").html(
            "Temperature: " + dayFiveTemp + "℉" + "  Humidity: " + dayFiveH + "%"
          );
        }
        fiveDayForecast();
      });
    });
  }
  // On Click
  $("#searchBtn").on("click", function () {
    citySearch = $("#search").val().trim();

    var newCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${authKey}`;

    runCurrentQuery(newCurrentWeather);

    $(".card").removeClass("hide");
    $(".future-forecast").removeClass("hide");
    
    if (location.indexOf(citySearch) === -1) {
        location.push(citySearch);
        localStorage.setItem("location", JSON.stringify(location));
        createButton(citySearch);
    }
  });

});
