<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required><br><br>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required><br><br>
      <button type="submit">Login</button>
      <p v-if="loginSuccess">Login successful!</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      loginSuccess: false // Add login success state
    };
  },
  methods: {
    login() {
      axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        this.loginSuccess = true; // Set login success state to true
      })
      .catch(error => {
        console.error('Login error:', error.response.data);
        // Handle login error
      });
    }
  }
}
</script>

