<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required><br><br>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required><br><br>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required><br><br>
      <button type="submit">Register</button>
      <p v-if="registrationSuccess">Registration successful!</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      registrationSuccess: false // Add registration success state
    };
  },
  methods: {
    register() {
      axios.post('http://localhost:3000/register', {
        username: this.username,
        email: this.email,
        password: this.password
      })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token); // Update token in local storage
        this.registrationSuccess = true; // Set registration success state to true
      })
      .catch(error => {
        console.error('Registration error:', error.response.data);
        // Handle registration error
      });
    }
  }
}
</script>



