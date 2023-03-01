function displayTemp(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#condition");
  let precipitationElemet = document.querySelector("#feelsLike");
  let humidityElement = document.querySelector("#Humidity");
  let windElement = document.querySelector("#Wind");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  conditionElement.innerHTML = response.data.condition.description;
  precipitationElemet.innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}
let apiKey = "89045e8b02ffo7bc061tb52f38ead08c";
let units = "metric";
let Url = `https://api.shecodes.io/weather/v1/current?query={Winnipeg}&key=${apiKey}&units=${units}`;
axios.get(Url).then(displayTemp);
