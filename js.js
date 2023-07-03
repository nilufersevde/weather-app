const searchForm = document.querySelector('#searchForm');
const cityCountryName = document.querySelector(".location");
const weatherCondition = document.querySelector(".condition");
const temperature = document.querySelector(".temp");
const feelsLike = document.querySelector(".feels-like");
const humidity = document.querySelector(".humidity")
const windd = document.querySelector(".wind");
const degree = document.querySelector(".deg");
const toggleButton = document.querySelector(".toggle");
const gif = document.querySelector('.gifimg');

//fetching the data when submit the location 
searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const searchValue = document.querySelector('.searchBar').value;
    fetchWeatherData(searchValue);
});
  
let currentData = null; // Variable to store current weather data


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
      // Process the retrieved weather data
      
      const weatherData = processData(data);
      currentData = weatherData;
      UI(weatherData.city, weatherData.country, weatherData.temperature, weatherData.feelsLike, weatherData.condition, weatherData.humidity, weatherData.wind )
      getSticker (weatherData.condition)
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
    condition: current.condition.text,
    feelsLike: current.feelslike_c,
    wind: current.wind_mph,
    humidity: current.humidity,
    c:current.temp_c,
    f:current.temp_f,
  };
  console.log(weatherData)
  console.log(weatherData.country);
  if (toggleButton.innerHTML === "Display °F") {
    weatherData.temperature = current.temp_c;
  } else {
    weatherData.temperature = current.temp_f;
  }
  return weatherData;
}

const UI = (city, country, temp, feels, cond, humid, wind) => {
    cityCountryName.textContent = city + ", " + country;
    weatherCondition.textContent = cond;
    temperature.textContent = temp;
    feelsLike.textContent = "Feels like: " + feels + "°";
    humidity.textContent = "Humidity: " + humid + "%";
    windd.textContent = "Wind: " + wind +"mp";
  };



fetchWeatherData('amsterdam');//when first open the page 


toggleButton.addEventListener("click", () => {
    if (toggleButton.innerHTML === "Display °F") {
        toggleButton.innerHTML = "Display °C";
        degree.innerHTML = "°F"
        temperature.textContent = currentData.f ;

    } else {
        
        toggleButton.innerHTML = "Display °F";
        degree.innerHTML = "°C"
        temperature.textContent =  currentData.c;
        console.log(currentData.f)
            }
    })

  
 async function getSticker (condition) {
      try {
        const response = await fetch(`https://api.giphy.com/v1/stickers/translate?api_key=9uqTcpTT1MVaSfTDL9ZPT6ML69LFAfKn&s=${condition}`, {mode: "cors"})
        const sticker = await response.json();
        gif.src = sticker.data.images.original.url;
      } catch (error){
        console.log(error);
      }
};