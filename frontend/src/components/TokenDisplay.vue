<template>
  <div>
    <h2>Your Security Token</h2>
    <p>{{ token }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: ''
    };
  },
  created() {
    // Retrieve token from local storage
    this.token = localStorage.getItem('token');
  }
}
</script>