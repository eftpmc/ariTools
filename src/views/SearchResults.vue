<template>
  <div class="video-container" v-if="episodeData">
    <VideoPlayer :episodeData="episodeData" />
  </div>
  <div v-else class="loading-overlay">
    <div class="loading-text">this shit loading fr</div>>
  </div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer.vue';

export default {
  name: 'SearchResults',
  components: {
    VideoPlayer,
  },
  props: {
    query: {
      type: String,
      required: true,
    },
    episode: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      episodeData: null,
    };
  },
  mounted() {
    // Call a method to perform the search based on the query and episode
    this.performSearch();
  },
  methods: {
    async performSearch() {
      try {
        // Perform the search and retrieve the episode data
        const response = await fetch(`https://arpi-api.herokuapp.com/api/anime/pahe/search/${this.query}`);
        const data = await response.json();

        // Process the search results and extract the episode data
        if (data.length > 0) {
          const episodeId = data[0].id;
          this.fetchEpisodeData(episodeId);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchEpisodeData(episodeId) {
      try {
        // Fetch the episode data based on the episode ID and episode number
        const response = await fetch(`https://arpi-api.herokuapp.com/api/anime/pahe/watch/${episodeId}/${this.episode}`);
        const data = await response.json();

        // Set the episodeData to the retrieved data
        this.episodeData = {
          videoUrl: data[0],
          // Add other necessary properties from the episode data
        };
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.video-container {
  width: 1280px;
  height: 720px;
}

@media (max-width: 1280px) {
  .video-container {
    width: 100vw;
    height: calc(100vw * 0.5625);
    margin-bottom: auto;
  }
}

.loading-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #000;
}

.loading-text {
  text-align: center;
  color: white;
  font-size: x-large;
}
</style>
