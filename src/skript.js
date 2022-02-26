//Time

function formattedDay(today) {
  let now = new Date();
  let day = [
    "Sunday",
    "Monday",
    "Thursday",
    "Wednesday",
    "Tuesday",
    "Friday",
    "Saturday",
  ];

  let weekDay = day[now.getDay()];

  let minutes = String(now.getMinutes()).padStart(2, "0");

  let hours = String(now.getHours()).padStart(2, "0");

  let todayTime = weekDay + " " + hours + ":" + minutes;

  return todayTime;
}

let today = document.querySelector("#todayTime");
today.innerHTML = formattedDay();

//City

let apiKey = "61cf3beda9a45cdf16d3405f3d2ca3b5";
let cityName = document.querySelector("#current-city").innerHTML;
//console.log(cityName);
let weather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let windSpeed = String(response.data.wind.speed * 3.6);
  let windSpeedRounded = Math.round(String(response.data.wind.speed * 3.6));
  //console.log(humidity);
  //console.log(temperature);
  //console.log(wind);
  //console.log(windSpeed);
  //console.log(windSpeedRounded);

  let temperatureSearch = document.querySelector("#temperature-today");
  temperatureSearch.innerHTML = temperature;

  let humiditySearch = document.querySelector("#humidity");
  humiditySearch.innerHTML = `${humidity}%`;

  let windSearch = document.querySelector("#wind");
  windSearch.innerHTML = `${windSpeedRounded} km/h`;
}

function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#inputPassword6");
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = inputCity.value;
  let weather = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=metric&appid=${apiKey}`;
  axios.get(weather).then(showWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

axios.get(weather).then(showWeather);
//console.log(weather);

//Current Button

function currentSearch(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  //let city = position.name;
  //console.log(position);
  let apiKey = "61cf3beda9a45cdf16d3405f3d2ca3b5";
  let weather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  function showWeather(response) {
    let temperature = Math.round(response.data.main.temp);
    console.log(temperature);

    let geoTemp = document.querySelector("#temperature-today");
    geoTemp.innerHTML = temperature;
  }
  axios.get(weather).then(showWeather);
}

let button = document.querySelector("#current-geo");
button.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(currentSearch)
);

console.log(navigator);

//Covert Temperature

function unitChangeC(event) {
  event.preventDefault();
  let temperaturChange = document.querySelector("#temperature-today");
  temperaturChange.innerHTML = "-5";
}

let unit = document.querySelector("#celcius");
unit.addEventListener("click", unitChangeC);

function unitChangeF(event) {
  event.preventDefault();
  let temperaturChange = document.querySelector("#temperature-today");
  temperaturChange.innerHTML = "20";
}

let unitFahrenheit = document.querySelector("#fahrenheit");
unitFahrenheit.addEventListener("click", unitChangeF);

// display the name of the city and the current temperature of the city
