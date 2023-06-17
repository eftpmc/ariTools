<template>
  <div class="portal-buttons">
    <button class="portal-button" @click="navigateTo('/anime')">Anime</button>
    <button class="portal-button" @click="navigateTo('/movies')">Movies</button>
    <button class="portal-button" @click="navigateTo('/books')">Books</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    navigateTo(path) {
      this.$router.replace(path);
    }
  }
};
</script>

<style scoped>
.portal-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.portal-button {
  padding: 10px 20px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.portal-button:hover {
  background-color: #444;
}
</style>
