const axios = require('axios');

// Replace 'f4f64f2610dc4e68db2f80c43eb09075' with your actual OpenWeatherMap API key
const apiKey = 'f4f64f2610dc4e68db2f80c43eb09075';

// Function to fetch weather data
async function fetchWeatherData(cityName) {
    try {
        // Make a GET request to the OpenWeatherMap API
        const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: cityName, // City name for which you want weather information
                appid: apiKey // Your OpenWeatherMap API key
            }
        });

        // Extract relevant data from the response
        const weatherData = {
            temperature: response.data.main.temp,
            description: response.data.weather[0].description
        };

        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error.response.data);
        throw new Error('Failed to fetch weather data');
    }
}

// Usage example: Fetch weather data for a city
const cityName = 'London'; // Replace 'London' with the name of the city you want weather information for
fetchWeatherData(cityName)
    .then(weatherData => {
        console.log('Weather Data:', weatherData);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
