function formarDate(timestamp) {
  let date = new Date(timestamp);
  let today = date.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    " Wednesday",
    "Thursday",
    " Friday",
    "Saturday ",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let day = days[date.getDay()];
  return `${day}, ${today} ${month}`;
}
function formarTime(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

function formatForecastDay(timstamp) {
  let date = new Date(timstamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="weather-forecast-date">${formatForecastDay(
                forecastDay.time
              )}</div>
              
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                  forecastDay.condition.icon
                }.png"
                alt=""
                width="40px"
              />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temperature.maximum
                )}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temperature.minimum
                )}°</span>
              </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "241b37tabc824f548d9of2bb0bbe3ed0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function desplayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#cityName");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");
  celciusTemperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formarDate(response.data.time * 1000);
  timeElement.innerHTML = formarTime(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}
function search(city) {
  let apiKey = "241b37tabc824f548d9of2bb0bbe3ed0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(desplayTemperature);
}
function hanelSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-input");
  search(cityElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", hanelSubmit);

search("Qeshm");
