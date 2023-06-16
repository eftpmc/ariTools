<template>
  <div class="home">
  </div>
</template>

<script>
export default {
  name: 'Home',
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
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
