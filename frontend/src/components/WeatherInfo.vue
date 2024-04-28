<template>
  <div>
    <h2>Weather Information</h2>
    <p v-if="weather.temperature">Temperature: {{ weather.temperature }}°C</p>
    <p v-if="weather.description">Description: {{ weather.description }}</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      weather: {},
      errorMessage: null
    };
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Authentication token not found';
      return;
    }

    axios.get('http://localhost:3000/weather?city=New York', {
      headers: {
        Authorization: token // Remove 'Bearer' prefix
      }
    })
    .then(response => {
      this.weather = response.data;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      if (error.response) {
        if (error.response.status === 401) {
          // Token is invalid or expired, redirect to login page or handle accordingly
          this.errorMessage = 'Unauthorized. Please log in again.';
          // You may want to redirect to the login page here
        } else {
          // Other server-side errors
          this.errorMessage = 'Failed to fetch weather data';
        }
      } else {
        // Network errors
        this.errorMessage = 'Network error. Please try again later.';
      }
    });
  }
}
</script>




