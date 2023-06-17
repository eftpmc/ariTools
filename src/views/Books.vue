<template>
  <div class="books">
    <div class="navbar">
      <div class="logo">
        <span class="logo-text">ari</span>
      </div>
    </div>
    <video class="background-video" autoplay loop muted playsinline preload>
        <source src="/videos/books.mp4" type="video/mp4">
      </video>
  </div>
</template>

<script>
export default {
  name: 'Books',
  methods: {
    navigateTo(path) {
      this.$router.replace(path);
    }
  }
};
</script>

<style scoped>
.books {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin: 0;
  padding: 0;
  text-align: center;
}
</style>
