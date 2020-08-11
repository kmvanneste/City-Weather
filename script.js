$(document).ready(function () {
  // VARIABLES
  var authKey = "7558419d9a99d2be3b1975a5ecc02218";
  var currentDay = moment().format("LL");
  var citySearch = "";

  //LOCAL STORAGE
  var location = JSON.parse(localStorage.getItem("location")) || [];
  for (var i = 0; i < location.length; i++) {
    createButton(location[i]);
  }

  //DYNAMICALLY CREATE BUTTONS BASED ON SEARCH
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

  //RUN THIS FUNCTION TO PULL DATA FROM API'S
  function runCurrentQuery(queryURL) {
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var city = response.name;
      var temp = response.main.temp;
      temp = Math.round((temp - 273.15) * (9 / 5) + 32);
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
        var uvi = parseInt(responseTwo.current.uvi);
        $("#card").removeClass(".hide");
        $(".city-name").text(city);
        $(".description").text("Currently: " + description);
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

        //FUTURE FORECAST DATA
        //Icons
        var dayOneIcon = responseTwo.daily[0].weather[0].icon;
        $("#dayOneIcon").html(
          "<img src='https://openweathermap.org/img/w/" + dayOneIcon + ".png'>"
        );
        var dayTwoIcon = responseTwo.daily[1].weather[0].icon;
        $("#dayTwoIcon").html(
          "<img src='https://openweathermap.org/img/w/" + dayTwoIcon + ".png'>"
        );
        var dayThreeIcon = responseTwo.daily[2].weather[0].icon;
        $("#dayThreeIcon").html(
          "<img src='https://openweathermap.org/img/w/" + dayThreeIcon + ".png'>"
        );
        var dayFourIcon = responseTwo.daily[3].weather[0].icon;
        $("#dayFourIcon").html(
          "<img src='https://openweathermap.org/img/w/" + dayFourIcon + ".png'>"
        );
        var dayFiveIcon = responseTwo.daily[4].weather[0].icon;
        $("#dayFiveIcon").html(
          "<img src='https://openweathermap.org/img/w/" + dayFiveIcon + ".png'>"
        );

        //Temperatures
        var dayOneTemp = parseInt(responseTwo.daily[0].temp.day);
        $("#dayOneTemp").html(Math.round((dayOneTemp - 273.15) * (9 / 5) + 32) + "℉");
        var dayTwoTemp = parseInt(responseTwo.daily[1].temp.day);
        $("#dayTwoTemp").html(Math.round((dayTwoTemp - 273.15) * (9 / 5) + 32) + "℉");
        var dayThreeTemp = parseInt(responseTwo.daily[2].temp.day);
        $("#dayThreeTemp").html(Math.round((dayThreeTemp - 273.15) * (9 / 5) + 32) + "℉");
        var dayFourTemp = parseInt(responseTwo.daily[3].temp.day);
        $("#dayFourTemp").html(Math.round((dayFourTemp - 273.15) * (9 / 5) + 32) + "℉");
        var dayFiveTemp = parseInt(responseTwo.daily[4].temp.day);
        $("#dayFiveTemp").html(Math.round((dayFiveTemp - 273.15) * (9 / 5) + 32) + "℉");

        //Humidity
        $("#dayOneH").html(responseTwo.daily[0].humidity + "%" + " " + "Humidity");
        $("#dayTwoH").html(responseTwo.daily[1].humidity + "%" + " " + "Humidity");
        $("#dayThreeH").html(responseTwo.daily[2].humidity + "%" + " " + "Humidity");
        $("#dayFourH").html(responseTwo.daily[3].humidity + "%" + " " + "Humidity");
        $("#dayFiveH").html(responseTwo.daily[4].humidity + "%" + " " + "Humidity");

        //Date
        $("#dayOneDate").html(moment().add(1, "days").format("ddd D"));
        $("#dayTwoDate").html(moment().add(2, "days").format("ddd D"));
        $("#dayThreeDate").html(moment().add(3, "days").format("ddd D"));
        $("#dayFourDate").html(moment().add(4, "days").format("ddd D"));
        $("#dayFiveDate").html(moment().add(5, "days").format("ddd D"));
      });
    });
  }
  //SEARCH BUTTON ON CLICK
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
