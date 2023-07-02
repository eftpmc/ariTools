<template>
  <div class="container">
    <div class="search-box">
      <input
        class="search-input"
        type="text"
        placeholder="Search"
        v-model="searchQuery"
        @keydown.enter="performSearch"
      />
      <button @click="performSearch" :disabled="!searchQueryIsValid">Search</button>
    </div>
    <div class="video-container" v-if="videoData">
      <VideoPlayer :videoData="videoData" />
    </div>
    <div v-else-if="loading" class="loading-overlay">
      <div class="loading-text">this shit loading fr</div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import VideoPlayer from '../components/VideoPlayer.vue';

export default {
  name: 'Movies',
  components: {
    VideoPlayer,
  },
  setup() {
    const searchQuery = ref('');
    const videoData = ref(null);
    const loading = ref(false);

    const searchQueryIsValid = computed(() => searchQuery.value.trim() !== '');

    const performSearch = async () => {
      loading.value = true;
      try {
        const response = await fetch(
          `https://arpi-api.herokuapp.com/v1/movie/flixhq/search/${searchQuery.value}`
        );
        const data = await response.json();

        if (data.length > 0) {
          const movieId = data[0].id;
          await fetchMovieData(movieId);
        }
      } catch (error) {
        console.error(error);
      }
      loading.value = false;
    };

    const fetchMovieData = async (movieId) => {
      try {
        const response = await fetch(
          `https://arpi-api.herokuapp.com/v1/movie/flixhq/watch/${movieId}`
        );
        const data = await response.json();

        const videoUrl = data.m3u8Data.sources.find(
          (source) => source.quality === '720'
        ).url;

        videoData.value = {
          videoUrl,
        };
      } catch (error) {
        console.error(error);
      }
    };

    return {
      searchQuery,
      videoData,
      loading,
      searchQueryIsValid,
      performSearch,
    };
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}

.search-box {
  margin: 20px;
}

.search-input {
  width: 200px;
  height: 30px;
  padding: 5px;
  font-size: 16px;
}

.video-container {
  width: 1280px;
  height: 720px;
  margin: 0 auto;
}

@media (max-width: 1280px) {
  .video-container {
    width: 100vw;
    height: calc(100vw * 0.5625);
  }
}

.loading-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.loading-text {
  color: white;
  font-size: x-large;
}
</style>
