<template>
  <div>
    <h2>Books</h2>
    <ul>
      <li v-for="book in books" :key="book.id">{{ book.title }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: []
    };
  },
  mounted() {
    axios.get('http://localhost:3000/api/books')
      .then(response => {
        this.books = response.data;
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }
}
</script>
