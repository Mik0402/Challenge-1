function todayDate() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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

  let day = days[currentTime.getDay()];
  let month = months[currentTime.getMonth()];
  let date = currentTime.getDate();
  let hour = currentTime.getHours();
  let minute = currentTime.getMinutes();

  let currentDate = `${day} ${month}, ${date} at ${hour}:${minute}.`;
  return currentDate;
}
let today = document.querySelector("h2");
today.innerHTML = todayDate();

function displayWeather(response) {
  let cityElement = document.querySelector("#location");
  cityElement.innerHTML = response.data.name;

  let weatherDiv = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  let descript = response.data.weather[0].main;
  let typeWeather = document.querySelector("#description");
  typeWeather.innerHTML = descript;
  weatherDiv.innerHTML = `${temperature}`;
  console.log(response);

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector(".wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let key = "fb9ba2ba068d2c8faabc8f622ed7013b";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", search);

function searchLocation(position) {
  let key = "fb9ba2ba068d2c8faabc8f622ed7013b";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}`;
  axios.get(url).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);
searchCity("Dallas");
