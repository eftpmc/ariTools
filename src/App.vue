<template>
  <div class="app">
    <div class="navbar">
      <div class="logo">
        <span class="logo-text">ari</span>
      </div>
    </div>
    <div class="content">
      <img class="background-image" src="/home/hoodie.png" alt="Hoodie" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    navigateTo(path) {
      this.$router.replace(path);
      this.navOpen = false;
    },
  },
};
</script>

<style scoped>
.app {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 0;
  background-color: #000;
  overflow: hidden;
}

.navbar {
  background-color: #000;
  width: 100%;
  padding: 20px;
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
  color: #fff;
  margin: 0;
  padding: 0;
}

.content {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.background-image {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30%;
  z-index: 5;
  pointer-events: none;
}
</style>
