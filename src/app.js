function formateDate(timeStamp) {
  let date = new Date(timeStamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day} ${hours} : ${minutes}`;
}

function displayTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#condition");
  let precipitationElemet = document.querySelector("#feelsLike");
  let humidityElement = document.querySelector("#Humidity");
  let windElement = document.querySelector("#Wind");
  let dateElemet = document.querySelector("#date");
  let currentIcon = document.querySelector("#icon");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
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
}

function handleSubmit(event) {
  event.preventDefault();
  let cityinputElement = document.querySelector("#city-input");
  search(cityinputElement.value);
  console.log(cityinputElement.value);
}
function search(city) {
  let apiKey = "89045e8b02ffo7bc061tb52f38ead08c";
  let units = "metric";
  let Url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(Url).then(displayTemp);
}

function convertF(event) {
  event.preventDefault();
  let Ftemp = (14 * 9) / 5 + 32;
  let tempE = document.querySelector("#temperature");
  tempE.innerHTML = Math.round(Ftemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheightLink = document.querySelector("#F-link");
fahrenheightLink.addEventListener("click", convertF);
