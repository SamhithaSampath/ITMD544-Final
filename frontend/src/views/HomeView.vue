<template>
  <div>
    <h1>Welcome to Your Application</h1>
    <BookList />
    <AuthorList />
    <TopicList />
    <WeatherInfo />
    <TokenDisplay /> <!-- Add TokenDisplay component here -->
    <RegisterButton /> <!-- Add RegisterButton component here -->
    <LoginButton /> <!-- Add LoginButton component here -->
  </div>
</template>

<script>
import BookList from '@/components/BookList.vue';
import AuthorList from '@/components/AuthorList.vue';
import TopicList from '@/components/TopicList.vue';
import WeatherInfo from '@/components/WeatherInfo.vue';
import TokenDisplay from '@/components/TokenDisplay.vue'; // Import the TokenDisplay component
import RegisterButton from '@/components/RegisterButton.vue'; // Import the RegisterButton component
import LoginButton from '@/components/LoginButton.vue'; // Import the LoginButton component

export default {
  components: {
    BookList,
    AuthorList,
    TopicList,
    WeatherInfo,
    TokenDisplay, // Register the TokenDisplay component
    RegisterButton, // Register the RegisterButton component
    LoginButton // Register the LoginButton component
  }
}
</script>


