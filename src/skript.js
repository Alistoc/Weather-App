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
  celciusTemperature = response.data.main.temp;
  let temperature = Math.round(celciusTemperature);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let windSpeed = String(response.data.wind.speed * 3.6);
  let windSpeedRounded = Math.round(String(response.data.wind.speed * 3.6));
  let description = response.data.weather[0].description;
  //console.log(response.data.weather[0].description);
  //console.log(humidity);
  //console.log(temperature);
  //console.log(wind);
  //console.log(windSpeed);
  //console.log(windSpeedRounded);
  //console.log(response.data.weather[0]);

  let temperatureSearch = document.querySelector("#temperature-today");
  temperatureSearch.innerHTML = temperature;

  let humiditySearch = document.querySelector("#humidity");
  humiditySearch.innerHTML = `${humidity}%`;

  let windSearch = document.querySelector("#wind");
  windSearch.innerHTML = `${windSpeedRounded} km/h`;

  let descriptionWeather = document.querySelector("#current-weather");
  descriptionWeather.innerHTML = description;

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

//Covert Temperature

function unitChangeC(event) {
  event.preventDefault();
  unit.classList.add("active");
  unitFahrenheit.classList.remove("active");
  let temperaturChange = document.querySelector("#temperature-today");
  temperaturChange.innerHTML = Math.round(celciusTemperature);
}

let unit = document.querySelector("#celcius");
unit.addEventListener("click", unitChangeC);

function unitChangeF(event) {
  event.preventDefault();
  let temperaturChange = document.querySelector("#temperature-today");
  unit.classList.remove("active");
  unitFahrenheit.classList.add("active");
  let fahrenheitTemperature = Math.round((celciusTemperature * 9) / 5 + 32);
  temperaturChange.innerHTML = fahrenheitTemperature;
  //alert(fahrenheitTemperature);
}

let unitFahrenheit = document.querySelector("#fahrenheit");
unitFahrenheit.addEventListener("click", unitChangeF);

let celciusTemperature = null;

search();
