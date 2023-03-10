function formateDate(timeStamp) {
  let date = new Date(timeStamp);
  let time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day} ${time}`;
}

function displayTemp(response) {
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#condition");
  let precipitationElemet = document.querySelector("#feelsLike");
  let humidityElement = document.querySelector("#Humidity");
  let windElement = document.querySelector("#Wind");
  let dateElemet = document.querySelector("#date");
  let currentIcon = document.querySelector("#icon");
  cityElement.innerHTML = response.data.city;
  conditionElement.innerHTML = response.data.condition.description;
  precipitationElemet.innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElemet.innerHTML = formateDate(response.data.time * 1000);
  currentIcon.setAttribute("src", response.data.condition.icon_url);
  currentIcon.setAttribute("alt", response.data.condition.icon);
  getForecast(response.data.coordinates);
}

function getForecast(coordinates) {
  let apiKey = "89045e8b02ffo7bc061tb52f38ead08c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&units=metric&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
							<div class="weather-forecast-date">
								${formatDay(forecastDay.time)}</div>
							<img src="${forecastDay.condition.icon_url}" alt="${
          forecastDay.condition.icon
        }" width="36">
							<div class="weather-forecast-temperature">
								<span class="weather-high"> ${Math.round(
                  forecastDay.temperature.maximum
                )}??</span> <span class="weather-low"> ${Math.round(
          forecastDay.temperature.minimum
        )}??</span>
							</div>
						</div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function handleSubmit(event) {
  event.preventDefault();
  let cityinputElement = document.querySelector("#city-input");
  search(cityinputElement.value);
}
function search(city) {
  let apiKey = "89045e8b02ffo7bc061tb52f38ead08c";
  let units = "metric";
  let Url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(Url).then(displayTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
