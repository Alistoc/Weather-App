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

function getForecast(coordinates) {
  //console.log(coordinates);

  let coordAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric
`;
  axios.get(coordAPI).then(insertForecast);
}

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

  getForecast(response.data.coord);
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

function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Thu", "Wed", "Tue", "Fri", "Sat"];

  return days[day];
}

function insertForecast(response) {
  let forecast = response.data.daily;
  //console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastInsert = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastInsert =
        forecastInsert +
        `
  
  <div class="col-2 forecast-weather">
    <div class="fs-4 pt-3 forecast-day">${formateDay(forecastDay.dt)}</div>
    <img class="weather-forcast-icon" src=
    "http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png"></img>
    <div class="forecast-temperature">
      <span class="temperature-max">${Math.round(forecastDay.temp.max)}C??</span>
      <span class="temperature-min">${Math.round(forecastDay.temp.min)}C??</span>
    </div>
  </div>`;
    }
  });

  forecastInsert = forecastInsert + `</div>`;
  forecastElement.innerHTML = forecastInsert;
}
