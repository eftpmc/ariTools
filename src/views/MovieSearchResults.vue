<template>
    <div class="video-container" v-if="videoData">
      <VideoPlayer :videoData="videoData" />
    </div>
    <div v-else class="loading-overlay">
      <div class="loading-text">this shit loading fr</div>
    </div>
  </template>
    
  <script>
  import VideoPlayer from '@/components/VideoPlayer.vue';
  
  export default {
    name: 'MovieSearchResults',
    components: {
      VideoPlayer,
    },
    props: {
      query: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        videoData: null,
      };
    },
    mounted() {
      // Call a method to perform the search based on the query
      this.performSearch();
    },
    methods: {
      async performSearch() {
        try {
         console.log(this.query);
          const response = await fetch(`https://arpi-api.herokuapp.com/v1/movie/flixhq/search/${this.query}`);
          const data = await response.json();

          if (data.length > 0) {
            const movieId = data[0].id;
            this.fetchMovieData(movieId);
          }
        } catch (error) {
          console.error(error);
        }
      },
      async fetchMovieData(movieId) {
        try {
          const response = await fetch(`https://arpi-api.herokuapp.com/v1/movie/flixhq/watch/${movieId}`);
          const data = await response.json();
  
          // Retrieve the 720p video URL from the sources data
          const videoUrl = data.m3u8Data.sources.find(source => source.quality === '720').url;
  
          // Set the videoData to the retrieved data
          this.videoData = {
            videoUrl,
            // Add other necessary properties from the response data
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
  