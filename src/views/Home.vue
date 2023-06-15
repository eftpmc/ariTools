<template>
  <div class="home">
    <div class="navbar">
      <div class="logo">
        <span class="logo-text">ari</span>
      </div>
      <button class="nav-toggle" v-if="isMobile || navOpen" @click="toggleNav">{{ navOpen ? 'Close' : 'Menu' }}</button>
    </div>
    <div class="content">
      <video class="background-video" :class="{ 'video-loaded': isVideoLoaded }" autoplay loop muted @canplaythrough="handleVideoLoad">
        <source :src="videoSource" type="video/mp4">
        <source :src="videoSourceWebm" type="video/webm">
      </video>
      <div class="sticky-notes" v-if="!isMobile">
        <button class="sticky-note note1" @click="navigateTo('/anime')">
          <img src="/anime.png" alt="Sticky Note 1">
        </button>
        <button class="sticky-note note2" @click="navigateTo('/movies')">
          <img src="/movie.png" alt="Sticky Note 2">
        </button>
        <button class="sticky-note note3" @click="navigateTo('/books')">
          <img src="/book.png" alt="Sticky Note 3">
        </button>
      </div>
      <div class="overlay" v-if="navOpen" @click="toggleNav">
        <nav class="navigation">
          <ul>
            <li @click="navigateTo('/movies')">Movies</li>
            <li @click="navigateTo('/books')">Books</li>
            <li @click="navigateTo('/anime')">Anime</li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      navOpen: false,
      isMobile: false,
      isVideoLoaded: false,
      videoSources: [
        '/videos/1.mp4',
        '/videos/2.mp4',
        '/videos/3.mp4'
      ],
      videoSourcesWebm: [
        '/videos/1.webm',
        '/videos/2.webm',
        '/videos/3.webm'
      ],
      videoSource: '',
      videoSourceWebm: ''
    };
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
    this.selectRandomVideo();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 767;
    },
    navigateTo(path) {
      this.$router.replace(path);
      this.navOpen = false; // Close the navigation after navigation
    },
    toggleNav() {
      this.navOpen = !this.navOpen;
    },
    selectRandomVideo() {
      const randomIndex = Math.floor(Math.random() * this.videoSources.length);
      this.videoSource = this.videoSources[randomIndex];
      this.videoSourceWebm = this.videoSourcesWebm[randomIndex];
    },
    handleVideoLoad() {
      this.isVideoLoaded = true;
    }
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sticky-notes {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  height: 100vh;
  width: 100%;
}

.sticky-note {
  max-width: 300px;
  width: 30%;
  height: auto;
  margin: 10px;
  position: absolute;
  z-index: 2;
  filter: brightness(.4);
  transition: transform 0.3s, filter 0.3s;
  border: none;
  background: none;
  cursor: pointer;
}

.sticky-note img {
  max-width: 100%;
  height: auto;
}

.sticky-note:focus {
  outline: none;
}

.sticky-note:hover {
  filter: brightness(.7);
}

.note1 {
  transform: rotate(-20deg) translateX(-50%) translateY(-50%);
  top: calc(50% - 30vh);
  left: 30%;
}

.note2 {
  transform: rotate(15deg) translateX(-50%) translateY(-50%);
  top: 20%;
  left: 70%;
}

.note3 {
  transform: rotate(-5deg) translateX(-50%) translateY(-50%);
  top: 80%;
  left: 40%;
}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 1);
  width: 100%;
}

.logo {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  margin: 0 auto;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin: 0;
  padding: 0;
  line-height: 1;
  text-align: center;
}

.nav-toggle {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  position: fixed;
  top: 20px;
  right: 20px;
}

.content {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  visibility: hidden;
  transition: opacity 1s ease-in-out, visibility 1s ease-in-out;
}

.background-video.video-loaded {
  opacity: 0.5;
  visibility: visible;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
}

.navigation ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.navigation li {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: white;
  margin-bottom: 20px;
  cursor: pointer;
}

@media (max-width: 767px) {
  .navbar {
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
  }
}
</style>
