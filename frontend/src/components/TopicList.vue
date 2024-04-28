<template>
  <div>
    <h2>Topics</h2>
    <ul>
      <li v-for="topic in topics" :key="topic.id">{{ topic.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      topics: []
    };
  },
  mounted() {
    axios.get('http://localhost:3000/api/topics')
      .then(response => {
        this.topics = response.data;
      })
      .catch(error => {
        console.error('Error fetching topics:', error);
      });
  }
}
</script>
