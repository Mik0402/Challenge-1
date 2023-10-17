function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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

  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let currentDate = date.getDate();

  return `${day} ${month}, ${currentDate} at ${hours}:${minutes}`;
}

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

  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);

  celsiusTemp = response.data.main.temp;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
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

function displayFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

searchCity("Dallas");
