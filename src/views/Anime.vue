<template>
  <div class="anime">
    <div class="navbar">
      <div class="logo">
        <div class="episode-box">
          <div class="arrow" @click="decrementEpisode">&#8249;</div>
          <div class="episode">{{ currentEpisode }}</div>
          <div class="arrow" @click="incrementEpisode">&#8250;</div>
        </div>
        <input class="search-input" type="text" placeholder="Search" v-model="searchQuery" @keydown.enter="search" />
      </div>
    </div>
    <video class="background-video video-js" autoplay loop muted playsinline ref="videoRef">
    </video>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default {
  name: 'Anime',
  data() {
    return {
      searchQuery: '',
      searchDisabled: false,
      currentEpisode: 1,
      videoPlayer: null,
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.replace(path);
    },
    async getM3U8File(id, episode) {
      try {
        const response = await fetch(`https://arpi-api.herokuapp.com/api/anime/pahe/watch/${id}/${episode}`);
        const data = await response.json();

        // Extract the M3U8 file URL from the response
        const m3u8Url = data[0];

        // Process the M3U8 file URL as needed
        console.log(m3u8Url);

        // Change the video source to the M3U8 file
        this.changeVideo(m3u8Url, { controls: true });
      } catch (error) {
        console.error(error);
      }
    },

    async search() {
      if (!this.searchDisabled) {
        // Disable the search button for 5 seconds
        this.disableSearchButton();
        try {
          const response = await fetch(`https://arpi-api.herokuapp.com/api/anime/pahe/search/${this.searchQuery}`);
          const data = await response.json();

          // Process the search results
          if (data.length > 0) {
            console.log("grabbing m3u8");
            this.getM3U8File(data[0].id, this.currentEpisode);
          }


        } catch (error) {
          console.error(error);
        }
      }
    },
    disableSearchButton() {
      this.searchDisabled = true;
      setTimeout(() => {
        this.searchDisabled = false;
      }, 5000);
    },
    incrementEpisode() {
      this.currentEpisode++;
      // Change the video when the episode changes
      this.changeVideo(`/videos/anime_episode_${this.currentEpisode}.mp4`, { controls: true });
    },
    decrementEpisode() {
      if (this.currentEpisode > 1) {
        this.currentEpisode--;
        // Change the video when the episode changes
        this.changeVideo(`/videos/anime_episode_${this.currentEpisode}.mp4`);
      }
    },
    changeVideo(src, options = {}) {
      console.log(src);
      if (this.videoPlayer) {
        if (src.includes('.m3u8')) {
          console.log("here")
          this.videoPlayer.src({ src: src, type: 'application/x-mpegURL' });
        } else {
          this.videoPlayer.src(src);
        }
        Object.keys(options).forEach((key) => {
          this.videoPlayer[key](options[key]);
        });
        this.videoPlayer.play();
      }
    },
    initializeVideoPlayer() {
      this.videoPlayer = videojs(this.$refs.videoRef, {}, function () {
        // Player initialized
      });
      this.changeVideo("/videos/anime.mp4")
    },
  },
  mounted() {
    this.initializeVideoPlayer();
  },
  beforeDestroy() {
    if (this.videoPlayer) {
      this.videoPlayer.dispose();
    }
  },
};
</script>

<style scoped>
.anime {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 1);
  width: 100%;
  height: 40px;
  z-index: 3;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}

.search-input {
  width: 200px;
  height: 20px;
  padding: 5px;
  font-size: 16px;
}

.episode {
  height: 20px;
  width: 20px;
  padding: 5px;
  background-color: white;
}

.episode-box {
  display: flex;
  align-items: center;
  color: black;
  font-size: 16px;
  margin-right: 20px;
}

.arrow {
  height: 20px;
  width: 20px;
  background-color: white;
  padding: 5px;
  cursor: pointer;
  margin: 0 5px;
}

.background-video {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
</style>
