<template>
  <div>
    <h2>Authors</h2>
    <ul>
      <li v-for="author in authors" :key="author.id">{{ author.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      authors: []
    };
  },
  mounted() {
    axios.get('http://localhost:3000/api/authors')
      .then(response => {
        this.authors = response.data;
      })
      .catch(error => {
        console.error('Error fetching authors:', error);
      });
  }
}
</script>
