const searchForm = document.querySelector('#searchForm');

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
  
      if (!response.ok) {
        throw new Error('Unable to fetch weather data');
      }
  
      const data = await response.json();
      console.log(data);
      // Process the retrieved weather data
      const weatherData = processData(data);
      console.log(weatherData);
    } 

    catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  

function processData(data) {
  // Extract the relevant weather data from the API response
  const { location, current } = data;
  const weatherData = {
    city: location.name,
    country: location.country,
    temperature: current.temp_c,
    condition: current.condition.text,
    feels_like:current.feelslike_c,
    wind:current.wind_mph,
    humidity:current.humidity,
  };
  return weatherData;
}


fetchWeatherData('London');