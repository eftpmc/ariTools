<template>
  <div class="app">
    <div class="content">
      <StickyNotes v-if="!isMobile" @navigateTo="navigateTo" />
      <div class="transition-container" v-show="showTransition">
        <video class="transition-video" autoplay loop muted playsinline preload>
          <source src="/videos/transition.mp4" type="video/mp4">
        </video>
      </div>
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
      showTransition: false,
    };
  },
  methods: {
    changeVideo() {
      this.showTransition = true;
      setTimeout(() => {
        this.showTransition = false;
      }, 500);
    },
    navigateTo(path) {
      this.changeVideo();
      this.$router.replace(path);
      this.navOpen = false;
    },
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

.content {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.transition-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.transition-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
</style>
