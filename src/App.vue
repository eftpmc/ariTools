<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './assets/theme.css';

export default {
  name: 'App',
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
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
