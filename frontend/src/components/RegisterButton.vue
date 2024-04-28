<template>
  <button @click="navigateToRegister">Register</button>
</template>

<script>
export default {
  methods: {
    navigateToRegister() {
      // Navigate to the Register view
      this.$router.push('/register');
    }
  }
}
</script>

<style>
button {
  padding: 12px 20px; /* Adjust padding as needed */
  background-color: #007bff; /* Primary button color */
  color: #ffffff; /* Text color */
  border: none; /* Remove border */
  border-radius: 5px; /* Add border-radius for rounded corners */
  cursor: pointer; /* Change cursor to pointer on hover */
  transition: background-color 0.3s ease; /* Add transition effect */
}

button:hover {
  background-color: #0056b3; /* Darker color on hover */
}

button:disabled {
  background-color: #cccccc; /* Disable button color */
  cursor: not-allowed; /* Change cursor to not-allowed when disabled */
}
</style>