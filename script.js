// SETUP VARIABLES
//======================================================

var authKey = "7558419d9a99d2be3b1975a5ecc02218";

var citySearch = "";

var currentWeatherURL = `api.openweathermap.org/data/2.5/weather?q=
${citySearch}&appid=${authKey}`;

var fiveDayURL = `api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${authKey}`;

var oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=${authKey}`





// FUNCTIONS
//======================================================

//MAIN PROCESSES
//======================================================


//1. Retrieve user inputs and convert to variables
//2. Use those variables to run on AJAX call to the weather website
//3. Break down the Weather Object into usable fields
//4. Dynamically generate html content

//5. Dealing with "edge cases" -- bugs or unusual situations that are not intuitive.
