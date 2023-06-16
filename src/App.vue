<template>
  <div class="app">
    <div class="navbar" :style="{ zIndex: navOpen ? '2' : '1' }">
      <div class="logo">
        <span class="logo-text">ari</span>
      </div>
      <button class="nav-toggle" v-if="isMobile || navOpen" @click="toggleNav">{{ navOpen ? 'Close' : 'Menu' }}</button>
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
    <div class="content">
      <StickyNotes v-if="!isMobile" @navigateTo="navigateTo" />
      <video class="background-video" :key="currentVideo" autoplay loop muted playsinline ref="videoRef">
        <source :src="currentVideo" type="video/mp4">
      </video>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import StickyNotes from '@/components/StickyNotes.vue';

export default {
  name: 'App',
  components: {
    StickyNotes
  },
  data() {
    return {
      navOpen: false,
      isMobile: false,
      currentVideo: '/videos/home.mp4',
      targetVideo: ''
    };
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 767;
    },
    navigateTo(path) {
      this.targetVideo = `/videos/${path.slice(1)}.mp4`;
      this.currentVideo = '/videos/transition.mp4';
      setTimeout(() => {
        this.currentVideo = this.targetVideo;
      }, 1000);
      this.$router.replace(path);
      this.navOpen = false;
    },
    toggleNav() {
      this.navOpen = !this.navOpen;
    }
  }
};
</script>

<style scoped>
.app {
  background-color: var(--accent-color);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 0;
}

.navbar {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 1);
  width: 100%;
}

.logo {
  display: block; /* Updated to display block on all screen sizes */
  text-align: center; /* Center the logo text */
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
  z-index: 2; /* Adjusted z-index */
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
}
</style>
