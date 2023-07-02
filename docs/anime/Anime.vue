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
      <div class="loading-text">damnn calm tf down its loading</div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import VideoPlayer from '../components/VideoPlayer.vue';

export default {
  name: 'AnimeSearch',
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
        const response = await fetch(`https://arpi-api.herokuapp.com/v1/anime/zoro/search/${searchQuery.value}`);
        const data = await response.json();

        if (data.length > 0) {
          const episodeId = data[0].id;
          await fetchEpisodeData(episodeId);
        }
      } catch (error) {
        console.error(error);
      }
      loading.value = false;
    };

    const fetchEpisodeData = async (episodeId) => {
      try {
        const response = await fetch(`https://arpi-api.herokuapp.com/v1/anime/zoro/watch/${episodeId}/1`);
        const data = await response.json();

        videoData.value = {
          videoUrl: data.subSource[0].file,
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
