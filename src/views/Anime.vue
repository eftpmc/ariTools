<template>
  <div class="anime">
    <!-- Add your content for the Anime view here -->
  </div>
</template>

<script>
export default {
  name: 'Anime',
  data() {
    return {
      isMobile: false,
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
      this.$router.replace(path);
    }
  }
};
</script>

<style scoped>
.anime {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
