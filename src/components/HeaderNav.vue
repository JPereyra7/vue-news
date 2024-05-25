<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { WeatherApp } from '../models/IWeather';
import axios from 'axios';


const APIKEYWEATHER = import.meta.env.VITE_API_KEY_WEATHER;
const city = ref("Stockholm");
const weather = ref<WeatherApp>();

const fetchWeather = async () => {
  try {
    const response = await axios.get<WeatherApp>(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city.value}&appid=${APIKEYWEATHER}`
    );
    weather.value = response.data;
    console.log(response.data);
  } catch (e) {
    console.error("Could not retrieve weather");
  }
  
};
onMounted(fetchWeather);

const mathRounded = computed(() => {
return weather.value ? Math.round(weather.value.main.temp) : null;
});
</script>

<template>
    <div class="navbarContainer">
      <!-- Display column  -->
      <img class="logo" src="/src/assets/Newsplanet.svg" alt="">
      <!-- Flex row här -->
      <ul class="navLinks">
        <li>News</li>
        <li>Videos</li>
        <li>Newsletters</li>
        <li>Events</li>
      </ul>
      <div class="weatherContainer">
        <template v-if="weather">
          <h3>{{ city }}: {{ mathRounded }}°C</h3>
          <img
            :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
            alt="Weather icon"
          />
        </template>
        <template v-else>
          <h3>Loading weather...</h3>
        </template>
      </div>
    </div>
  </template>


<style scoped>

.navbarContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid rgba(44, 44, 44, 0.13);
}

.logo {
    width: 10em;
}

.navLinks {
    border-top: 1px solid rgba(44, 44, 44, 0.13);
    display: flex;
    gap: 2em;
    list-style: none;
    margin-bottom: 1em;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    cursor: pointer;
}

li:hover {
    color: rgba(37, 44, 53, 0.673);
}

.weatherContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
}

img {
    width: 2rem;
    margin-bottom: auto;
}

h3 {
    font-family: Poppins, sans-serif;
    font-weight: 600;
    font-size: 0.8em;
}

h3:hover {
    font-weight: 700;
    cursor: pointer;
}

</style>