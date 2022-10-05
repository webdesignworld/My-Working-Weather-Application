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


function formatDay(timestamp){
let date = new Date (timestamp*1000);
let day = date.getDay();
let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
  
];



return days[day];

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

  console.log(response.data);




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

getForecast(response.data.coord);

}

function search(city) {
  let apiKey = "96771e971243152d6b8948878c26adde";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("Berlin");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


//all forecast data



function displayForecast(response){
let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;

forecast.forEach(function(forecastDay, index){
if (index < 6){


  forecastHTML = forecastHTML + 
  `  
  <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>



    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"                  
   

    />
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
      <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
    </div>
  </div>
  
`;}

});

forecastHTML = forecastHTML+`</div>`;
forecastElement.innerHTML= forecastHTML;

}

function getForecast(coordinates){
console.log(coordinates);
let apiKey = "96771e971243152d6b8948878c26adde";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayForecast);

}

//display all forecast
// displayForecast();