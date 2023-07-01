const searchForm = document.querySelector('#searchForm');
const cityCountryName = document.querySelector(".location");
const weatherCondition = document.querySelector(".condition");
const temperature = document.querySelector(".temp");
const feelsLike = document.querySelector(".feels-like");
const humidity = document.querySelector(".humidity")
const windd = document.querySelector(".wind");
const degree = document.querySelector(".deg");
const toggleButton = document.querySelector(".toggle");

//fetching the data when submit the location 
searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const searchValue = document.querySelector('.searchBar').value;
    fetchWeatherData(searchValue);
});
  

async function fetchWeatherData(location) {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=ce5712ff5978400ca76165010232606&q=${location}`,
        {
          mode: 'cors',
        }
      );
  
      if (response.status === 400) {
        throw new Error('Unable to fetch weather data');
      }
  
      const data = await response.json();
      console.log(data);
      // Process the retrieved weather data
      const weatherData = processData(data);
      console.log(weatherData);
      UI(weatherData.city, weatherData.country, weatherData.temperature, weatherData.feelsLike, weatherData.condition, weatherData.humidity, weatherData.wind )
    } 

    catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }


function processData(data) {
  // Extract the relevant weather data from the API response
  const { location, current } = data; //Destructuring assignment
  const weatherData = {
    city: location.name,
    country: location.country,
    temperature: current.temp_c,
    condition: current.condition.text,
    feelsLike: current.feelslike_c,
    wind: current.wind_mph,
    humidity: current.humidity,
  };
  return weatherData;
}

const UI = (city, country, temp, feels, cond, humid, wind) => {
    cityCountryName.textContent = city +"," +country;
    weatherCondition.textContent = cond;
    temperature.textContent = temp;
    feelsLike.textContent = "Feels like: " + feels + "°";
    humidity.textContent = "Humidty: " + humid + "%";
    windd.textContent = "Wind:" + wind +"mp";
  };



fetchWeatherData('Istanbul');//when first open the page 

const convertCelsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
const convertFahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
toggleButton.addEventListener("click", () => {
    if (toggleButton.innerHTML === "Display °F") {
        toggleButton.innerHTML = "Display °C";
        degree.innerHTML = "°F"
        temperature.textContent =  convertCelsiusToFahrenheit(temperature.textContent);

    } else {
        console.log(toggleButton.innerHTML);
        toggleButton.innerHTML = "Display °F";
        degree.innerHTML = "°C"
        temperature.textContent =  convertFahrenheitToCelsius(temperature.textContent);
            }
    })
