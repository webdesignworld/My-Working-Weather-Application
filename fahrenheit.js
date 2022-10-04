function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }

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

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes} `;
}


















function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#real-weather");
  let temperatureElementFahrenheit = document.querySelector(
    "#real-weather-fahrenheit"
  );

  let cityElement = document.querySelector("#new-city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");





  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  temperatureElementFahrenheit.innerHTML = Math.round(
    (response.data.main.temp * 9) / 5 + 32
  );
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  timeElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "3499ef150985eccadd080ff408a018df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


//all forecast data


function displayForecast(){

  let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
let days = ["Thu", "Fri", "Sat", "Sun"];
days.forEach(function(day){
  forecastHTML = forecastHTML + 
  `  
  <div class="col-2">
    <div class="weather-forecast-date">${day}</div>
    <img src="http://openweathermap.org/img/wn/50d@2x.png" alt=""
    width = "42"                  
    
    />
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max"> 18°</span>
      <span class="weather-forecast-temperature-min"> 12°</span>
    </div>
  </div>
  
`;

});

forecastHTML = forecastHTML+`</div>`;
forecastElement.innerHTML= forecastHTML;

}

//display all forecast
displayForecast();