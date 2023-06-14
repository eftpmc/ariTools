<template>
  <div class="home">
    <div class="navbar">
      <div class="logo">
        <span class="logo-text">ari</span>
      </div>
      <button class="nav-toggle" @click="toggleNav">{{ navOpen ? 'Close' : 'Menu' }}</button>
    </div>
    <div class="content">
      <video class="background-video" autoplay loop muted>
        <source src="/clips.mp4" type="video/mp4">
      </video>
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
import Button from '@/components/Button.vue';

export default {
  name: 'Home',
  components: {
    Button,
  },
  data() {
    return {
      navOpen: false,
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.replace(path);
      this.navOpen = false; // Close the navigation after navigation
    },
    toggleNav() {
      this.navOpen = !this.navOpen;
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navbar {
  display: flex;
  justify-content: center; /* Added */
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
  text-align: center; /* Added */
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  z-index: -1;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
